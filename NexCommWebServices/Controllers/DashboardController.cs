using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;
using static NexCommDAL.NexCommRepository;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly NexCommRepository _repository;
        public DashboardController(NexCommRepository repository)
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
        public ActionResult<List<object>> GetChatRoomsByUser(int userId)
        {
            try
            {
                var rooms = _repository.GetAllChatRoomsByUser(userId);
                return Ok(rooms);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Controller Error: " + ex.Message);
                return StatusCode(500, "An error occurred while fetching chat rooms.");
            }
        }


        [HttpGet("latest-message/{roomId}")]
        public IActionResult GetLatestMessage(int roomId)
        {
            var result = _repository.GetLatestMessageByRoomId(roomId);

            if (result.message == null)
                return NotFound();

            return Ok(new
            {
                message = result.message,
                userName = result.userName
            });
        }
    }
}
