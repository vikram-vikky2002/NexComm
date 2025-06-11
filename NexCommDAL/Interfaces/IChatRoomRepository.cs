using NexCommDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Interfaces
{
    public interface IChatRoomRepository
    {
        Task<List<ChatRoom>> GetByUserIdAsync(int userId);
        Task<ChatRoom> CreateAsync(ChatRoom chatRoom); // For 1:1 or single user
        Task<ChatRoom> CreateAsync(ChatRoom chatRoom, List<int> userIds); // For group chat
        Task AddUserToChatRoomAsync(int roomId, int userId);
        Task RemoveUserFromChatRoomAsync(int roomId, int userId);
        Task DeleteAsync(int roomId);
    }
}
