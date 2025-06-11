using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexCommDAL;
using NexCommDAL.Models;
using NexCommWebServices.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NexCommController : Controller
    {
        private readonly NexCommRepository _repository;
        public NexCommController(NexCommRepository repository)
        {
            _repository = repository;
        }

        // GET: api/chat/online-users
        [HttpGet("online-users")]
        public ActionResult<List<Models.User>> GetOnlineUsers()
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
        public ActionResult<List<Models.ChatRoom>> GetChatRoomsByUser(int userId)
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

        #region user
        //userName, role, emailId, phone, newUser, password, live, isAdmin

        [HttpPost("Login")]
        public ActionResult AddUser( Models.User user)
        {
            if (user == null)
                return BadRequest("User data is null.");
            else
            {
                NexCommDAL.Models.User user1 = new NexCommDAL.Models.User();
                user1.UserName = user.UserName;
                user1.NewUser = user.NewUser;
                user1.Role = user.Role;
                user1.EmailId = user.EmailId;
                user1.Password = user.Password;
                user1.Live = user.Live;
                user1.IsAdmin = user.IsAdmin;

                _repository.AddUser(user1);

                return Ok();
            }
        }

       
    
    
    #endregion
}
}
