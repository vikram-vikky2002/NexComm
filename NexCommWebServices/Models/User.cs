using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class User
    {
        //userName, role, emailId, phone, newUser, password, live, isAdmin
        public int UserId { get; set; }

        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Role { get; set; } = null!;

        [Required]
        public string? EmailId { get; set; }

        public string? Phone { get; set; }

        public bool? NewUser { get; set; }

        public string? Password { get; set; }

        public DateTime? LastLogin { get; set; }

        public bool? Live { get; set; }


        public bool? IsAdmin { get; set; }

    }
}
