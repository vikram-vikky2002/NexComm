using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NexCommDAL.Models;

public partial class User
{
    [Key]
    public int UserId { get; set; }
    [Required]
    [StringLength(100)]
    public string UserName { get; set; } = null!;

    public string Role { get; set; } = null!;
    [StringLength(100)]
    public string? EmailId { get; set; }

    public string? Phone { get; set; }

    public bool? NewUser { get; set; }
    [Required]
    public string? Password { get; set; }

    public DateTime? LastLogin { get; set; }

    public bool? Live { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<ChatRoom> ChatRooms { get; set; } = new List<ChatRoom>();

    public virtual ICollection<File> Files { get; set; } = new List<File>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual Role RoleNavigation { get; set; } = null!;
}
