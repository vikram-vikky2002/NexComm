using Microsoft.EntityFrameworkCore;
using NexCommDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Repositories
{
    public class UserRepository
    {
        public NexCommDbContext Context { get; set; }

        public UserRepository()
        {
            Context = new NexCommDbContext();
        }

        public async Task<User> GetByIdAsync(int userId)
        {
            return await Context.Users
                .Include(u => u.ChatRooms)
                .FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await Context.Users
                .Include(u => u.ChatRooms)
                .ToListAsync();
        }

        public async Task CreateAsync(User user)
        {
            await Context.Users.AddAsync(user);
            await Context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            Context.Users.Update(user);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int userId)
        {
            var user = await Context.Users.FindAsync(userId);
            if (user != null)
            {
                Context.Users.Remove(user);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<User> AuthenticateUserAsync(string userName, string password)
        {
            return await Context.Users
                .Include(u => u.RoleNavigation)
                .FirstOrDefaultAsync(u => u.EmailId == userName && u.Password == password);
        }
    }
}
