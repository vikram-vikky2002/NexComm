using System;
using System.Collections.Generic;

namespace NexCommDAL.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
