using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommWebServices.Models;
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

        // GET: api/chat/online-users
        [HttpGet("testing")]
        public ActionResult Testing()
        {
            try
            {
                return Ok(true);
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

        [HttpPost("create-room")]
        public async Task<IActionResult> CreateRoomAsync([FromBody] CreateRoomRequest request)
        {
            if (request.UserIds.Count < 2)
                return BadRequest("At least two users are required.");

            try
            {
                if (!request.IsGroup && request.UserIds.Count == 2)
                {
                    var existingRoom = _repository.GetExistingPrivateRoom(request.UserIds[0], request.UserIds[1]);
                    if (existingRoom != null)
                        return Ok(new { message = "Room already exists", roomId = existingRoom.RoomId });
                }

                var createdRoom = await _repository.CreateRoomAsync(request);
                return Ok(new { message = "Room created", roomId = createdRoom.RoomId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }
}
