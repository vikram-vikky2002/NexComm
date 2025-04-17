using NexCommDAL.Models;

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
}
