using System;
using System.Threading.Tasks;
using NexCommDAL.Models;
using NexCommDAL.Repositories;

namespace NexCommBusinessLayer.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;

        public UserService()
        {
            _userRepository = new UserRepository();
        }

        public async Task<User> LoginAsync(string userName, string password)
        {
            var user = await _userRepository.AuthenticateUserAsync(userName, password);
            
            if (user != null)
            {
                // Update last login time
                user.LastLogin = DateTime.Now;
                await _userRepository.UpdateAsync(user);
            }

            return user;
        }
    }
}
