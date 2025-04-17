using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NexCommController : ControllerBase
    {
        private readonly NexCommRepository _repository;
        public NexCommController(NexCommRepository repository)
        {
            _repository = repository;
        }

        // GET: api/chat/online-users
        [HttpGet("online-users")]
        public ActionResult<List<User>> GetOnlineUsers()
        {
            try
            {
                var users = _repository.GetAllOnlineUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching online users.");
            }
        }

        // GET: api/chat/rooms/{userId}
        [HttpGet("rooms/{userId}")]
        public ActionResult<List<ChatRoom>> GetChatRoomsByUser(int userId)
        {
            try
            {
                var rooms = _repository.GetAllChatRoomsByUser(userId);
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching chat rooms.");
            }
        }
    }
}
