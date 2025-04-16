using System;
using System.Collections.Generic;

namespace NexCommDAL.Models;

public partial class ChatRoom
{
    public int RoomId { get; set; }

    public bool? IsGroup { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<File> Files { get; set; } = new List<File>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
