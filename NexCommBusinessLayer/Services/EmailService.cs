using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using NexCommDAL.Models;

namespace NexCommBusinessLayer.Services
{
    public class EmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpOptions)
        {
            _smtpSettings = smtpOptions.Value;
        }

        public void SendOtpEmail(string toEmail, string otp)
        {
            var fromAddress = new MailAddress(_smtpSettings.UserName, "Fame Finds");
            var toAddress = new MailAddress(toEmail);

            var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = "OTP To Reset Your Password",
                Body = $"<html><body><h2 style='color:#e74c3c;'>Do Not Share This OTP!</h2>" +
                       $"<p>Your One-Time Password (OTP) is:</p>" +
                       $"<h3 style='color:#68658c;'>{otp}</h3><p>This OTP is valid for 5 minutes.</p></body></html>",
                IsBodyHtml = true
            };

            using var smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
            {
                Credentials = new NetworkCredential(_smtpSettings.UserName, _smtpSettings.Password),
                EnableSsl = _smtpSettings.EnableSsl,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false
            };

            smtpClient.Send(message);
        }

        public string GenerateOtp()
        {
            return new Random().Next(100000, 999999).ToString();
        }
    }

}
