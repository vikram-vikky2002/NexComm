using Microsoft.EntityFrameworkCore;
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

    public class ChatRoomDto
    {
        public int RoomId { get; set; }
        public string? GroupName { get; set; }
        public bool? IsGroup { get; set; } = false;
        public List<string> UserNames { get; set; } = new();
        public string ChatTitle { get; set; } = string.Empty; // <-- Add this
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
                Console.WriteLine($"Latest Message: {result.Message.Text}, User: {result.UserName}");
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
     
    public void AddUser(User user)
    {
        Context.Users.Add(user);
        Context.SaveChanges();
    }
}
