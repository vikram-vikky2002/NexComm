using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;
using NexCommDAL.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
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
        //[HttpPut("room")]
        //public JsonResult AddNewUser(Models.User user)
        //{
        //    bool status = false;
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            NexCommDAL.Models.User UserObj = new NexCommDAL.Models.User();
        //            UserObj.UserId = user.UserId;
        //            UserObj.UserName = user.UserName;
        //            UserObj.EmailId = user.EmailId;
        //            UserObj.Phone = user.Phone;
        //            UserObj.Role = user.Role;
        //            UserObj.NewUser = user.NewUser;
        //            UserObj.Password = user.Password;
        //            UserObj.LastLogin = user.LastLogin;
        //            UserObj.Live = user.Live;
        //            UserObj.IsAdmin = user.IsAdmin;

        //            status = _repository.AddUser(UserObj);

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //        if (ex.InnerException != null)
        //        {
        //            Console.WriteLine(ex.InnerException.Message);
        //        }
        //        status = false;
        //    }
        //    return Json(status);
        //}


    }
}



