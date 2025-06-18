using NexCommDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommBusinessLayer.Interfaces
{
    public interface IChatRoomService
    {
        Task<List<ChatRoom>> GetChatRoomsForUserAsync(int userId);
        Task<ChatRoom> CreateChatRoomAsync(ChatRoom chatRoom);
        Task<ChatRoom> CreateGroupChatRoomAsync(ChatRoom chatRoom, List<int> userIds);
        Task AddUserToRoomAsync(int roomId, int userId);
        Task RemoveUserFromRoomAsync(int roomId, int userId);
        Task DeleteChatRoomAsync(int roomId);
    }
    public interface IEmailService {
    }
    public interface IAuthService { }
}
