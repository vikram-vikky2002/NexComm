using Microsoft.EntityFrameworkCore;
using NexCommBusinessLayer.Interfaces;
using NexCommDAL.Interfaces;
using NexCommDAL.Models;
using NexCommDAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommBusinessLayer.Services
{
    public class ChatRoomService : IChatRoomService
    {
        private readonly ChatRoomRepository _chatRoomRepository;

        public ChatRoomService()
        {
            var optionsBuilder = new DbContextOptionsBuilder<NexCommDbContext>();
            optionsBuilder.UseSqlServer("\"Data Source=(localdb)\\\\MSSQLLocalDB;Initial Catalog=NexCommDB;Integrated Security=true\"");

            var context = new NexCommDbContext(optionsBuilder.Options);
            _chatRoomRepository = new ChatRoomRepository(context);

        }

        public async Task<List<ChatRoom>> GetChatRoomsForUserAsync(int userId)
        {
            return await _chatRoomRepository.GetByUserIdAsync(userId);
        }

        public async Task<ChatRoom> CreateChatRoomAsync(ChatRoom chatRoom)
        {
            return await _chatRoomRepository.CreateAsync(chatRoom);
        }

        public async Task<ChatRoom> CreateGroupChatRoomAsync(ChatRoom chatRoom, List<int> userIds)
        {
            return await _chatRoomRepository.CreateAsync(chatRoom, userIds);
        }

        public async Task AddUserToRoomAsync(int roomId, int userId)
        {
            await _chatRoomRepository.AddUserToChatRoomAsync(roomId, userId);
        }

        public async Task RemoveUserFromRoomAsync(int roomId, int userId)
        {
            await _chatRoomRepository.RemoveUserFromChatRoomAsync(roomId, userId);
        }

        public async Task DeleteChatRoomAsync(int roomId)
        {
            await _chatRoomRepository.DeleteAsync(roomId);
        }
    }

}
