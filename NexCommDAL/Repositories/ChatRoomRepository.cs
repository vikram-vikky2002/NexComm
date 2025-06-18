using Microsoft.EntityFrameworkCore;
using NexCommDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Repositories
{
    public class ChatRoomRepository
    {
        public NexCommDbContext Context { get; set; }

        public ChatRoomRepository(NexCommDbContext context)
        {
            Context = context;
        }

        public async Task<List<ChatRoom>> GetByUserIdAsync(int userId)
        {
            return await Context.ChatRoomMembers
                .Include(crm => crm.Room)
                .ThenInclude(r => r.CreatedByNavigation)
                .Where(crm => crm.UserId == userId)
                .Select(crm => crm.Room)
                .Include(r => r.CreatedByNavigation)
                .ToListAsync();
        }

        public async Task<ChatRoom> CreateAsync(ChatRoom chatRoom)
        {
            await Context.ChatRooms.AddAsync(chatRoom);
            await Context.SaveChangesAsync();
            return chatRoom;
        }

        public async Task<ChatRoom> CreateAsync(ChatRoom chatRoom, List<int> userIds)
        {
            // Create room
            await Context.ChatRooms.AddAsync(chatRoom);
            await Context.SaveChangesAsync();

            // Add all members to ChatRoomMembers
            var members = userIds.Distinct().Select(uid => new ChatRoomMember
            {
                RoomId = chatRoom.RoomId,
                UserId = uid
            });

            await Context.ChatRoomMembers.AddRangeAsync(members);
            await Context.SaveChangesAsync();

            return chatRoom;
        }


        public async Task AddUserToChatRoomAsync(int roomId, int userId)
        {
            var membership = new ChatRoomMember
            {
                RoomId = roomId,
                UserId = userId
            };

            await Context.ChatRoomMembers.AddAsync(membership);
            await Context.SaveChangesAsync();
        }


        public async Task RemoveUserFromChatRoomAsync(int roomId, int userId)
        {
            var membership = await Context.ChatRoomMembers
                .FirstOrDefaultAsync(m => m.RoomId == roomId && m.UserId == userId);

            if (membership != null)
            {
                Context.ChatRoomMembers.Remove(membership);
                await Context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(int roomId)
        {
            var room = await Context.ChatRooms.FindAsync(roomId);
            if (room != null)
            {
                var memberships = Context.ChatRoomMembers.Where(m => m.RoomId == roomId);
                Context.ChatRoomMembers.RemoveRange(memberships);

                Context.ChatRooms.Remove(room);
                await Context.SaveChangesAsync();
            }
        }
       


    }
}
