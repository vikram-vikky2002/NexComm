using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class Role
    {
        public string RoleId { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}
