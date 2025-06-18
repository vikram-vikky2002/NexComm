using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Models
{
    public class SmtpSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool EnableSsl { get; set; }
    }
    public class UserPasswordResetToken
    {
        public int userId { get; set; }
        public int emailId { get; set; }
        public string Token { get; set; }
        public DateTime Expiry { get; set; }
        public bool? IsUsed { get; set; }
        public DateTime RequestedAt { get; set; }
    }
    public class ResetModel
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
    public class OtpVerificationRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }
    public class EmailRequest
    {
        public string Email { get; set; }
    }



}
