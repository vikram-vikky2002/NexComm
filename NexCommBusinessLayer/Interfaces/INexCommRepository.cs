using NexCommDAL.Models;
using NexCommDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = NexCommDAL.Models.File;

namespace NexCommBusinessLayer.Interfaces
{
    internal interface INexCommRepository
    {
        List<User> GetAllOnlineUsers();
        Task<bool> UpdateGroupNameAsync(int roomId, string newName);
        List<object> GetAllChatRoomsByUser(int userId);
        (Message? message, string? userName) GetLatestMessageByRoomId(int roomId);
        bool AddUser(User user);
        Task<Message> SendMessageAsync(Message message);
        Task<List<Message>> GetMessagesByUserAsync(int userId);
        List<NexCommRepository.MessageDto> GetMessagesForRoomAsync(int roomId);
        Task<File> UploadFileAsync(File file);
        Task<List<File>> GetFilesByUserAsync(int userId);
        Task<List<File>> GetFilesByRoomAsync(int roomId);
        ChatRoom? GetExistingPrivateRoom(int userId1, int userId2);
        Task<ChatRoom> CreateRoomAsync(CreateRoomRequest request);
        bool UpdateUserDetails(int userId, string userName, string role, string emailId);
        List<User> GetAllUsers();
        bool DeleteUser(int userId);
        bool SetNewPassword(string newPassword, int userId);
    }
}
