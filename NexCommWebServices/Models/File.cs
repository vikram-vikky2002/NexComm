namespace NexCommWebServices.Models
{
    public class File
    {
        public string FileId { get; set; }
        public string UserId { get; set; }
        public string Path { get; set; }
        public string FileType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
