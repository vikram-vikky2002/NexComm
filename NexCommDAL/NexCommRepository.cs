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

    public List<ChatRoom> GetAllChatRoomsByUser(int userId)
    {
        List<ChatRoom> rooms = new List<ChatRoom>();
        try
        {
            var list = (from b in Context.ChatRoomMembers
                        where b.UserId == userId
                        select b.RoomId)
                     .ToList();

            rooms = (from cr in Context.ChatRooms
                     where list.Contains(cr.RoomId)
                     select cr).ToList();

        }
        catch (Exception)
        {
            rooms = new List<ChatRoom>(); // Fixed the issue here by specifying the type argument.  
        }

        return rooms;
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

    public List<Message> GetMessagesForRoomAsync(int roomId)
    {
        try
        {
            return Context.Messages
            .Where(m => m.RoomId == roomId)
            .OrderBy(m => m.CreatedAt)
            .ToList();
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
                .Select(f => new File
                {
                    FileId = f.FileId,
                    UserId = f.UserId,
                    FileType = f.FileType,
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



}
