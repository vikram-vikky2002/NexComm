using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommBusinessLayer.Interfaces;
using NexCommBusinessLayer.Services;
using NexCommDAL.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private readonly ChatRoomService _chatRoomService;

        public ChatRoomController()
        {
            _chatRoomService = new ChatRoomService();
        }

        // GET api/chatroom/user/5
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetChatRoomsForUser(int userId)
        {
            var chatRooms = await _chatRoomService.GetChatRoomsForUserAsync(userId);
            return Ok(chatRooms);
        }
        

        // POST api/chatroom/group
        [HttpPost("group")]
        public async Task<IActionResult> CreateGroupChatRoom([FromBody] Models.ChatRoomCreateModel model)
        {
            var chatRoom = new ChatRoom
            {
                CreatedBy = model.CreatedBy,
                IsGroup = true,
                CreatedOn = DateTime.UtcNow
            };

            var created = await _chatRoomService.CreateChatRoomAsync(chatRoom);

            // Add members including creator
            var allUserIds = model.UserIds.Distinct().ToList();
            allUserIds.Add(model.CreatedBy);

            foreach (var userId in allUserIds.Distinct())
            {
                await _chatRoomService.AddUserToRoomAsync(created.RoomId, userId);
            }

            return CreatedAtAction(nameof(GetChatRoomsForUser), new { userId = model.CreatedBy }, created);
        }

        // POST api/chatroom/{roomId}/add/{userId}
        [HttpPost("{roomId}/add/{userId}")]
        public async Task<IActionResult> AddUserToRoom(int roomId, int userId)
        {
            await _chatRoomService.AddUserToRoomAsync(roomId, userId);
            return NoContent();
        }

        // DELETE api/chatroom/{roomId}/remove/{userId}
        [HttpDelete("{roomId}/remove/{userId}")]
        public async Task<IActionResult> RemoveUserFromRoom(int roomId, int userId)
        {
            await _chatRoomService.RemoveUserFromRoomAsync(roomId, userId);
            return NoContent();
        }

        // DELETE api/chatroom/{roomId}
        [HttpDelete("{roomId}")]
        public async Task<IActionResult> DeleteChatRoom(int roomId)
        {
            await _chatRoomService.DeleteChatRoomAsync(roomId);
            return NoContent();
        }
    }
}
