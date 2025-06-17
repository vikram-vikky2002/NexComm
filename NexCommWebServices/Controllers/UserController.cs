using Microsoft.AspNetCore.Mvc;
using NexCommBusinessLayer.Services;
using NexCommDAL;
using NexCommDAL.Models;
using System.Threading.Tasks;

namespace NexCommWebServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService _userService;
        private readonly NexCommRepository _repository;

        public UserController(UserService userService)
        {
            _userService = userService;
            _repository = new NexCommRepository();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            var user = await _userService.LoginAsync(request.UserName, request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            return Ok(new
            {
                userId = user.UserId,
                userName = user.UserName,
                role = user.Role,
                email = user.EmailId,
                phone = user.Phone,
                lastLogin = user.LastLogin
            });
        }

        public class LoginRequest
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("room")]
        public JsonResult AddNewUser(Models.User user)
        {
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    NexCommDAL.Models.User UserObj = new NexCommDAL.Models.User();
                    UserObj.UserId = user.UserId;
                    UserObj.UserName = user.UserName;
                    UserObj.EmailId = user.EmailId;
                    UserObj.Phone = user.Phone;
                    UserObj.Role = user.Role;
                    UserObj.NewUser = user.NewUser;
                    UserObj.Password = user.Password;
                    UserObj.LastLogin = user.LastLogin;
                    UserObj.Live = user.Live;
                    UserObj.IsAdmin = user.IsAdmin;

                    status = _repository.AddUser(UserObj);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
                status = false;
            }
            return Json(status);
        }
        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _repository.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error retrieving users: " + ex.Message);
            }
        }

        [HttpPut]
        public JsonResult UpdateUserDetails(NexCommWebServices.Models.User user)
        {
            bool status = false;
            try
            {
                if (ModelState.IsValid)
                {
                    NexCommDAL.Models.User UserObj = new NexCommDAL.Models.User();
                    UserObj.UserId = user.UserId;
                    UserObj.UserName = user.UserName;
                    UserObj.Role = user.Role;
                    UserObj.EmailId = user.EmailId;
                    status = _repository.UpdateUserDetails(UserObj.UserId, UserObj.UserName, UserObj.Role, UserObj.EmailId);

                }
            }
            catch (Exception ex)
            {
                status = false;
                Console.WriteLine(ex.Message);
            }
            return Json(status);
        }

    
    [HttpDelete("{userId}")]
        public JsonResult DeleteUser(int userId)
        {
            bool status = false;
            try
            {
                status = _repository.DeleteUser(userId);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
                status = false;
            }
            return Json(status);
        }

    }
}