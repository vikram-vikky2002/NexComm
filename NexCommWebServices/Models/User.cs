namespace NexCommWebServices.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public Role Role { get; set; }
        public string Phone { get; set; }
        public bool NewUser { get; set; }
        public string Password { get; set; }
        public DateTime LastLogin { get; set; }
        public bool Live { get; set; }
        public bool IsAdmin { get; set; }
        public List<ChatRoom> Rooms { get; set; }

    }
}
