using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Models
{
    public class ChatRoom
    {
        public string RoomId { get; set; }
        public bool isGroup { get; set; }
        public List<User> Users { get; set; }
        public List<File> Files { get; set; }
        public List<Message> Messages { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
