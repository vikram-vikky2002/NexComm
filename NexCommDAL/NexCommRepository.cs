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

}
    //public bool UpdateUser(User user)
    //{
    //    bool result = false;
    //    try
    //    {
    //        User user1 = new User();
    //       user1 = Context.Users.Find(user.UserId);
    //        if(user1 != null)
    //        {

    //        }
    //    }
    //    catch (Exception ex)
    //    {

    //        result = false;
    //    }
    //    return result;
    

