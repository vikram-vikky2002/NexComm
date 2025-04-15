using System;
using System.Collections.Generic;

namespace NexCommDAL.Models;

public partial class ChatRoomMember
{
    public int UserId { get; set; }

    public int RoomId { get; set; }

    public virtual ChatRoom Room { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
