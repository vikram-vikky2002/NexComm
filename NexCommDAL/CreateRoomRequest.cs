namespace NexCommDAL
{
    public class CreateRoomRequest
    {
        public List<int> UserIds { get; set; } = new();
        public string? GroupName { get; set; }
        public bool IsGroup { get; set; }
        public int CreatedBy { get; set; }
    }
}