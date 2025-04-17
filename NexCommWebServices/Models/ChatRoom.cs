using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class ChatRoom
    {
        public int RoomId { get; set; }

        [Required]
        public bool? IsGroup { get; set; }

        [Required]
        public int CreatedBy { get; set; }
        
        public DateTime? CreatedOn { get; set; }
    }
}
