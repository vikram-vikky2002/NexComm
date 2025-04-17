using Microsoft.EntityFrameworkCore;
using NexCommDAL.Models;
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
            users = [];
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
            rooms = [];
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

    public async Task<IEnumerable<Message>> GetMessagesByUserAsync(int userId)
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
        }
        return Enumerable.Empty<Message>();

    }

    public Task<IEnumerable<Message>> GetMessagesForRoomAsync(int roomId)
    {
        throw new NotImplementedException();
    }
    public async Task<File> UploadFileAsync(File file)
    {
        try
        {
            file.CreatedAt = DateTime.Now;
            Context.Files.Add(file);
            await Context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        return file;
    }

}
