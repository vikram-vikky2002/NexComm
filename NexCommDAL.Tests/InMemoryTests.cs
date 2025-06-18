using Xunit;
using Microsoft.EntityFrameworkCore;
using NexCommDAL;
using NexCommDAL.Models;

namespace NexCommDAL.Tests
{
    public class InMemoryTests
    {
        private NexCommRepository GetInMemoryRepo()
        {
            var options = new DbContextOptionsBuilder<NexCommDbContext>()
                .UseInMemoryDatabase(databaseName: "NexComm_Test_DB")
                .Options;

            var context = new NexCommDbContext(options);
            return new NexCommRepository(context);
        }

        [Fact]
        public void AddUser_ReturnsTrue_WhenValidUser()
        {
            // Arrange
            var repo = GetInMemoryRepo();
            var user = new User
            {
                UserId = 1,
                UserName = "Vikram",
                Role = "User",
                EmailId = "vikram@example.com",
                Password = "secure123",
                NewUser = true,
                LastLogin = DateTime.Now,
                Phone = "1234567890",
                Live = true,
                IsAdmin = false
            };

            // Act
            var result = repo.AddUser(user);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void AddUser_ReturnsFalse_WhenMissingRequiredFields()
        {
            // Arrange
            var repo = GetInMemoryRepo();
            var invalidUser = new User
            {
                UserId = 2,
                // UserName is missing (required)
                Role = "User",
                Password = "1234"
            };

            // Act
            var result = repo.AddUser(invalidUser);

            // Assert
            Assert.False(result);
        }
    }
}
