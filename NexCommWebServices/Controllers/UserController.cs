using Microsoft.AspNetCore.Mvc;
using NexCommBusinessLayer.Services;
using NexCommDAL.Models;
using System.Threading.Tasks;

namespace NexCommWebServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
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
    }
}
