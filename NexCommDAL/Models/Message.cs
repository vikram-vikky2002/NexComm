using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Models
{
    public class Message
    {
        public string MessageId { get; set; }
        public string UserId { get; set; }
        public string text { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
