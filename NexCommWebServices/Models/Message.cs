using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public string Text { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}
