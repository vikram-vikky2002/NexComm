using System;
using System.ComponentModel.DataAnnotations;

namespace NexCommWebServices.Models
{
    public class FileUploadRequest
    {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
