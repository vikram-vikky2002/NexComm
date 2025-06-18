using Microsoft.EntityFrameworkCore;
using NexCommDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Repositories
{
    public class ForgotpwdRepository
    {
        private readonly NexCommDbContext _context;
        public ForgotpwdRepository(NexCommDbContext context)
        {
            _context = context;
        }
        public User GetUserByUsername(string email)
        {
            return _context.Users.FirstOrDefault(c => c.EmailId == email);
        }

        public void SaveOtp(int userId, string otp)
        {
            var entry = new UserPasswordResetToken
            {
                userId = userId,
                Token = otp,
                Expiry = DateTime.Now.AddMinutes(5),
                IsUsed = false,
                RequestedAt = DateTime.Now
            };

            // Correcting the type of _context.UserPasswordResetToken to DbSet<UserPasswordResetToken>
            var userPasswordResetTokens = _context.UserPasswordResetToken as DbSet<UserPasswordResetToken>;
            if (userPasswordResetTokens == null)
            {
                throw new InvalidOperationException("UserPasswordResetToken is not properly configured in the DbContext.");
            }

            userPasswordResetTokens.Add(entry);
            _context.SaveChanges();
        }

        public UserPasswordResetToken GetOtpByEmail(string email, string otp)
        {
            var customer = GetUserByUsername(email);
            if (customer == null) return null;

            // Correcting the type of _context.userPasswordResetTokens to DbSet<UserPasswordResetToken>  
            var userPasswordResetTokens = _context.UserPasswordResetToken as DbSet<UserPasswordResetToken>;
            if (userPasswordResetTokens == null)
            {
                throw new InvalidOperationException("UserPasswordResetToken is not properly configured in the DbContext.");
            }

            return userPasswordResetTokens.FirstOrDefault(t =>
                t.userId == customer.UserId && t.Token == otp &&
                (t.IsUsed == false || t.IsUsed == null) && t.Expiry > DateTime.Now);
        }

        public void MarkOtpAsUsedByEmail(string email, string otp)
        {
            var customer = GetUserByUsername(email);
            if (customer == null) return;

            // Correcting the type of _context.userPasswordResetTokens to DbSet<UserPasswordResetToken>  
            var userPasswordResetTokens = _context.UserPasswordResetToken as DbSet<UserPasswordResetToken>;
            if (userPasswordResetTokens == null)
            {
                throw new InvalidOperationException("UserPasswordResetToken is not properly configured in the DbContext.");
            }

            var token = userPasswordResetTokens.FirstOrDefault(t =>
                t.userId == customer.UserId && t.Token == otp &&
                t.IsUsed != true && t.Expiry > DateTime.Now);

            if (token != null)
            {
                token.IsUsed = true;
                _context.SaveChanges();
            }
        }

        public UserPasswordResetToken GetLatestVerifiedOtp(string email)
        {
            var customer = GetUserByUsername(email);
            if (customer == null)
                return null;

            // Correcting the type of _context.userPasswordResetTokens to DbSet<UserPasswordResetToken>  
            var userPasswordResetTokens = _context.UserPasswordResetToken as DbSet<UserPasswordResetToken>;
            if (userPasswordResetTokens == null)
            {
                throw new InvalidOperationException("UserPasswordResetToken is not properly configured in the DbContext.");
            }

            return userPasswordResetTokens
                .Where(t => t.userId == customer.UserId && t.IsUsed == true && t.Expiry > DateTime.Now)
                .OrderByDescending(t => t.RequestedAt)
                .FirstOrDefault();
        }

    }
}
