using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NexCommDAL.Models;

public partial class NexCommDbContext : DbContext
{
    public NexCommDbContext()
    {
    }

    public NexCommDbContext(DbContextOptions<NexCommDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChatRoom> ChatRooms { get; set; }

    public virtual DbSet<ChatRoomMember> ChatRoomMembers { get; set; }

    public virtual DbSet<File> Files { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=NexCommDB;Integrated Security=true"); }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChatRoom>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__chatRoom__6C3BF5BEF408BE2F");

            entity.ToTable("chatRoom");

            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdOn");
            entity.Property(e => e.GroupName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("groupName");
            entity.Property(e => e.IsGroup)
                .HasDefaultValue(false)
                .HasColumnName("isGroup");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ChatRooms)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__chatRoom__create__2F10007B");
        });

        modelBuilder.Entity<ChatRoomMember>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("chatRoomMembers");

            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Room).WithMany()
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__chatRoomM__roomI__32E0915F");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__chatRoomM__userI__31EC6D26");
        });

        modelBuilder.Entity<File>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("PK__file__C2C6FFDC6DDCCCD4");

            entity.ToTable("file");

            entity.Property(e => e.FileId).HasColumnName("fileId");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.FileType)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fileType");
            entity.Property(e => e.Path)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("path");
            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Room).WithMany(p => p.Files)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__file__roomId__36B12243");

            entity.HasOne(d => d.User).WithMany(p => p.Files)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__file__userId__35BCFE0A");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK__message__4808B993FE410B8E");

            entity.ToTable("message");

            entity.Property(e => e.MessageId).HasColumnName("messageId");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("createdAt");
            entity.Property(e => e.RoomId).HasColumnName("roomId");
            entity.Property(e => e.Text)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("text");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Room).WithMany(p => p.Messages)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__message__roomId__3B75D760");

            entity.HasOne(d => d.User).WithMany(p => p.Messages)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__message__userId__3A81B327");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__role__CD98462A238C6DDD");

            entity.ToTable("role");

            entity.Property(e => e.RoleId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("roleId");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__user__CB9A1CFF4F8124D8");

            entity.ToTable("user");

            entity.HasIndex(e => e.EmailId, "UQ__user__87355E73BE6370E8").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("emailId");
            entity.Property(e => e.IsAdmin)
                .HasDefaultValue(false)
                .HasColumnName("isAdmin");
            entity.Property(e => e.LastLogin)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("lastLogin");
            entity.Property(e => e.Live)
                .HasDefaultValue(false)
                .HasColumnName("live");
            entity.Property(e => e.NewUser)
                .HasDefaultValue(true)
                .HasColumnName("newUser");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("role");
            entity.Property(e => e.UserName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("userName");

            entity.HasOne(d => d.RoleNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Role)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__role__276EDEB3");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
