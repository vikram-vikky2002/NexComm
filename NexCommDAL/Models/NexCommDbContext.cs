using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Models
{
    public class NexCommDbContext : DbContext
    {
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if(!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog=NexCommDB;Integrated Security=true");
        //    }
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = config.GetConnectionString("NexCommConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Primary Keys
            modelBuilder.Entity<User>().HasKey(u => u.UserId);
            modelBuilder.Entity<Role>().HasKey(r => r.RoleId);
            modelBuilder.Entity<ChatRoom>().HasKey(c => c.RoomId);
            modelBuilder.Entity<File>().HasKey(f => f.FileId);
            modelBuilder.Entity<Message>().HasKey(m => m.MessageId);

            // User and Role relationship
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role);

            // User and ChatRoom many-to-many
            modelBuilder.Entity<ChatRoom>()
                .HasMany(c => c.Users)
                .WithMany(u => u.Rooms);

            // ChatRoom and Messages one-to-many
            modelBuilder.Entity<ChatRoom>()
                .HasMany(c => c.Messages)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            // ChatRoom and Files one-to-many
            modelBuilder.Entity<ChatRoom>()
                .HasMany(c => c.Files)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
