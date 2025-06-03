using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class File
    {
        public int FileId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public string Path { get; set; }

        [Required]
        public string FileType { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
