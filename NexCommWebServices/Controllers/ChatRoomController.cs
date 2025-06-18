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
                IsGroup = model.IsGroup,
                CreatedOn = DateTime.UtcNow,
                GroupName = model.GroupName
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

        // GET api/chatroom/download?fileUrl=/uploads/filename.png
        [HttpGet("download")]
        public IActionResult DownloadFile([FromQuery] string fileUrl)
        {
            if (string.IsNullOrEmpty(fileUrl))
                return BadRequest("File URL is required.");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileUrl.TrimStart('/'));

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            var contentType = "application/octet-stream"; // fallback
            var extension = Path.GetExtension(filePath).ToLowerInvariant();

            // Optional: Set specific content types for common formats
            var contentTypes = new Dictionary<string, string>
            {
                { ".png", "image/png" },
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".pdf", "application/pdf" },
                { ".txt", "text/plain" }
                // Add more as needed
            };

            if (contentTypes.TryGetValue(extension, out var detectedType))
            {
                contentType = detectedType;
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            var fileName = Path.GetFileName(filePath);

            return File(fileBytes, contentType, fileName);
        }
    }
}
