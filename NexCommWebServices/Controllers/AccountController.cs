using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NexCommDAL;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly NexCommRepository _repository;
        public AccountController(NexCommRepository repository)
        {
            _repository = repository;
        }




        [HttpPost("new_password")]
        public async Task<IActionResult> SetNewPassword([FromBody] ChangePasswordResquest request)
        {
            try
            {
                var result = await _repository.SetNewPassword(request.newPassword, request.userEmail);
                if (result == 1)
                    return Ok("Password changed successfully");
                return BadRequest("Failed to update password");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred : " + ex.Message);
            }
        }


        public class ChangePasswordResquest
        {
            public string newPassword { get; set; }
            public string userEmail { get; set; }
        }

    }
}
