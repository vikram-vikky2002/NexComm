using Microsoft.AspNetCore.Mvc;
using NexCommBusinessLayer.Services;
using NexCommDAL;
using NexCommDAL.Models;
using NexCommWebServices.Models;

namespace NexCommWebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotpwdController(ForgotpwdService forgotpwdService) : Controller
    {
        private readonly ForgotpwdService _forgotpwdService = forgotpwdService;
        private NexCommRepository _repository = new NexCommRepository();
        private int userId;

        [HttpPost("request-otp")]
        public IActionResult RequestOtp([FromBody] EmailRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                return BadRequest("Email is required.");

            var customer = _repository.GetUserByUsername(request.Email);
            if (customer == null)
                return NotFound("Email not found");

            var otp = _forgotpwdService.GenerateOtp();
            _repository.SaveOtp(userId, otp);
            _forgotpwdService.SendOtpEmail(request.Email, otp);

            return Ok("OTP has been sent to your email.");
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] OtpVerificationRequest request)
        {
            var token = _repository.GetOtpByEmail(request.Email, request.Otp);
            if (token == null)
                return BadRequest("Invalid or expired OTP.");

            _repository.MarkOtpAsUsedByEmail(request.Email, request.Otp);
            return Ok("OTP verified. You may now reset your password.");
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetModel request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                return BadRequest("Email is required.");
            if (string.IsNullOrWhiteSpace(request.NewPassword) || string.IsNullOrWhiteSpace(request.ConfirmPassword))
                return BadRequest("All fields are required.");
            if (request.NewPassword != request.ConfirmPassword)
                return BadRequest("Passwords do not match.");


            var token = _repository.GetLatestVerifiedOtp(request.Email) as OtpToken;
            if (token == null || token.Expiry < DateTime.Now)
                return BadRequest("OTP not verified or session expired. Please verify your OTP again.");


            var user = _repository.GetUserByUsername(request.Email) as NexCommDAL.Models.User; // Explicit cast to User type  
            if (user == null)
                return NotFound("Customer not found.");

            var result = _forgotpwdService.UpdatePassword(user.UserId, request.NewPassword);
            if (!result)
                return StatusCode(500, "Error updating password.");

            return Ok("Password reset successful.");
        }
    }

    public interface IRepository
    {
        // Define the methods that IRepository should expose  
        NexCommDAL.Models.User GetUserByUsername(string email);
        void SaveOtp(int customerId, string otp);
        OtpToken GetOtpByEmail(string email, string otp);
        void MarkOtpAsUsedByEmail(string email, string otp);
        OtpToken GetLatestVerifiedOtp(string email);
        void SaveOtp(object userId, object otp);
    }
}
