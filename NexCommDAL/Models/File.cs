using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexCommDAL.Models
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
