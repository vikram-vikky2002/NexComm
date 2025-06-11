namespace NexCommWebServices.Models
{
    public class ChatRoomCreateModel
    {
        public bool? IsGroup { get; set; }
        public int CreatedBy { get; set; }
        public List<int> UserIds { get; set; } = new();
    }
}
