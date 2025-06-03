using System;
using System.Collections.Generic;

namespace NexCommDAL.Models;

public partial class File
{
    public int FileId { get; set; }

    public int UserId { get; set; }

    public int RoomId { get; set; }

    public string Path { get; set; } = null!;

    public string FileType { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual ChatRoom Room { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
