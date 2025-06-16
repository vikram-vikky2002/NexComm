using Microsoft.EntityFrameworkCore;
using NexCommDAL.Models;
using System.Collections.Generic;
using File = NexCommDAL.Models.File;

namespace NexCommDAL;

public class NexCommRepository
{
    public NexCommDbContext Context { get; set; }

    public NexCommRepository()
    {
        Context = new NexCommDbContext();
    }

    public List<User> GetAllOnlineUsers()
    {
        List<User> users = new List<User>();
        try
        {
            users = Context.Users.Where(user => user.Live ?? false).ToList();
        }
        catch (Exception)
        {
            users = new List<User>();  
        }

        return users;
    }

    public List<object> GetAllChatRoomsByUser(int userId)
    {
        try
        {
            var rooms = (from cr in Context.ChatRooms
                         join crm in Context.ChatRoomMembers on cr.RoomId equals crm.RoomId
                         where crm.UserId == userId
                         select new
                         {
                             cr.RoomId,
                             cr.IsGroup,
                             cr.GroupName,
                             cr.CreatedBy,
                             cr.CreatedOn,
                             ChatTitle = cr.IsGroup.HasValue && cr.IsGroup.Value
                                 ? (cr.GroupName ?? "Unnamed Group")
                                 : (from m in Context.ChatRoomMembers
                                    join u in Context.Users on m.UserId equals u.UserId
                                    where m.RoomId == cr.RoomId && u.UserId != userId
                                    select u.UserName).FirstOrDefault() ?? "Unknown User"
                         }).ToList<object>();

            return rooms;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error in GetAllChatRoomsByUser: " + ex.Message);
            throw; // Re-throw to trigger 500 for controller to catch
        }
    }




    public (Message? message, string? userName) GetLatestMessageByRoomId(int roomId)
    {
        try
        {
            var result = (from m in Context.Messages
                          join u in Context.Users on m.UserId equals u.UserId
                          where m.RoomId == roomId
                          orderby m.CreatedAt descending
                          select new
                          {
                              Message = m,
                              UserName = u.UserName
                          }).FirstOrDefault();

            if (result != null)
            {
                //Console.WriteLine($"Latest Message: {result.Message.Text}, User: {result.UserName}");
                return (result.Message, result.UserName);
            }
            else
            {
                Console.WriteLine("No message found for the given room ID.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception: " + ex.Message);
            return (null, ex.Message); // or just (null, null)
        }

        return (null, null);
    }

    public bool AddUser(User user)
    {
        bool result = false;
        try
        {
            Context.Users.Add(user);
            Context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {

            result = false;
        }
        return result;
    }
    public async Task<Message> SendMessageAsync(Message message)
    {

        try
        {
            message.CreatedAt = DateTime.Now;
            Context.Messages.Add(message);
            await Context.SaveChangesAsync();
            
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return message;
    }

    public async Task<List<Message>> GetMessagesByUserAsync(int userId)
    {
        try
        {
            return await Context.Messages
                .Include(m => m.User)
                .Where(m => m.UserId == userId)
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return [];
        }
        
    }

    public class MessageDto
    {
        public int MessageId { get; set; }
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }


    public List<MessageDto> GetMessagesForRoomAsync(int roomId)
    {
        try
        {
            var messages = (from m in Context.Messages
                            join u in Context.Users on m.UserId equals u.UserId
                            where m.RoomId == roomId
                            orderby m.CreatedAt
                            select new MessageDto
                            {
                                MessageId = m.UserId,
                                RoomId = m.RoomId,
                                UserId = m.UserId,
                                UserName = u.UserName,
                                Text = m.Text,
                                CreatedAt = (DateTime)m.CreatedAt
                            }).ToList();
            return messages;

            //return Context.Messages
            //.Where(m => m.RoomId == roomId)
            //.OrderBy(m => m.CreatedAt)
            //.ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return [];
        }
    }
    public async Task<File> UploadFileAsync(File file)
    {
        file.CreatedAt = DateTime.Now;
        Context.Files.Add(file);
        await Context.SaveChangesAsync();

        return new File
        {
            FileId = file.FileId,
            UserId = file.UserId,
            FileType = file.FileType,
            CreatedAt = file.CreatedAt
        };
    }

    public async Task<List<File>> GetFilesByUserAsync(int userId)
    {
        try
        {
            return await Context.Files
                .Where(f => f.UserId == userId)
                .OrderBy(f => f.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new List<File>();
        }
    }

    public async Task<List<File>> GetFilesByRoomAsync(int roomId)
    {
        try
        {
            return await Context.Files
                .Where(f => f.RoomId == roomId)
                .OrderBy(f => f.CreatedAt)
                .Select(f => new File
                {
                    FileId = f.FileId,
                    UserId = f.UserId,
                    RoomId = f.RoomId,
                    FileType = f.FileType,
                    Path = f.Path,
                    CreatedAt = f.CreatedAt
                })
                .ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new List<File>();
        }
    }

    public ChatRoom? GetExistingPrivateRoom(int userId1, int userId2)
    {
        return Context.ChatRooms
            .Where(r => r.IsGroup == false)
            .Where(r => Context.ChatRoomMembers
                .Where(cm => cm.RoomId == r.RoomId)
                .Select(cm => cm.UserId)
                .OrderBy(id => id)
                .SequenceEqual(new List<int> { userId1, userId2 }.OrderBy(id => id)))
            .FirstOrDefault();
    }

    public async Task<ChatRoom> CreateRoomAsync(CreateRoomRequest request)
    {
        var newRoom = new ChatRoom
        {
            IsGroup = request.IsGroup,
            CreatedBy = request.CreatedBy,
            CreatedOn = DateTime.Now,
            GroupName = request.IsGroup ? request.GroupName : null
        };

        Context.ChatRooms.Add(newRoom);
        await Context.SaveChangesAsync(); // RoomId generated

        foreach (var userId in request.UserIds)
        {
            Context.ChatRoomMembers.Add(new ChatRoomMember
            {
                RoomId = newRoom.RoomId,
                UserId = userId
            });
        }

        await Context.SaveChangesAsync();
        return newRoom;
    }
     
}
