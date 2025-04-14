CREATE DATABASE NexCommDB;
GO

USE NexCommDB;
GO

CREATE TABLE [role] (
    roleId VARCHAR(255) NOT NULL PRIMARY KEY,
    roleName VARCHAR(255) NOT NULL
);
GO

CREATE TABLE [user] (
    userId VARCHAR(255) NOT NULL PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    newUser BIT DEFAULT 1,
    password VARCHAR(255),
    lastLogin DATETIME DEFAULT GETDATE(),
    live BIT DEFAULT 0,
    idAdmin BIT DEFAULT 0,
    rooms NVARCHAR(MAX)
);
GO

CREATE TABLE [chatRoom] (
    roomId VARCHAR(255) NOT NULL PRIMARY KEY IDENTITY,
    isGroup BIT DEFAULT 0, -- Changed BOOLEAN to BIT
    users NVARCHAR(MAX), -- Changed JSON to NVARCHAR(MAX)
    files NVARCHAR(MAX), -- Changed JSON to NVARCHAR(MAX)
    messages NVARCHAR(MAX), -- Changed JSON to NVARCHAR(MAX)
    createdBy VARCHAR(255) NOT NULL,
    createdOn DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (createdBy) REFERENCES [user](userId)
);
GO

CREATE TABLE [file] (
    fileId VARCHAR(255) NOT NULL PRIMARY KEY IDENTITY,
    userId VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    fileType VARCHAR(255) NOT NULL,
    dateTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES [user](userId)
);
GO

CREATE TABLE [message] (
    messageId VARCHAR(255) NOT NULL PRIMARY KEY IDENTITY,
    userId VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    dateTime DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES [user](userId)
);
GO


INSERT INTO [role] (roleId, roleName) VALUES 
('admin', 'Administrator'),
('user', 'Regular User'),
('moderator', 'Moderator');
GO


INSERT INTO [user] (userId, userName, role, phone, newUser, password, lastLogin, live, idAdmin, rooms) VALUES 
('user1@example.com', 'Alice Johnson', 'user', '123-456-7890', TRUE, 'password123', GETDATE(), FALSE, FALSE, '[]'),
('user2@example.com', 'Bob Smith', 'admin', '234-567-8901', TRUE, 'password456', GETDATE(), TRUE, TRUE, '[]'),
('user3@example.com', 'Carol Williams', 'moderator', '345-678-9012', TRUE, 'password789', GETDATE(), TRUE, FALSE, '[]');
GO


INSERT INTO [chatRoom] (roomId, isGroup, users, files, messages, createdBy, createdOn) VALUES 
('room1', TRUE, '["user1@example.com", "user2@example.com"]', '[msg1, msg2, msg3]', '[]', 'user2@example.com', GETDATE()),
('room2', FALSE, '["user3@example.com", "user1@example.com"]', '[]', '[]', 'user3@example.com', GETDATE()),
('room3', TRUE, '["user2@example.com"]', '[]', '[]', 'user2@example.com', GETDATE());
GO


INSERT INTO [file] (fileId, userId, path, fileType, dateTime) VALUES 
('file1', 'user1@example.com', '/files/abc.pdf', 'application/pdf', GETDATE()),
('file2', 'user2@example.com', '/files/image.jpg', 'image/jpeg', GETDATE()),
('file3', 'user3@example.com', '/files/report.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', GETDATE());
GO


INSERT INTO [message] (messageId, userId, text, dateTime) VALUES 
('msg1', 'user1@example.com', 'Hello, everyone!', GETDATE()),
('msg2', 'user2@example.com', 'Hi Alice!', GETDATE()),
('msg3', 'user3@example.com', 'Welcome to the chat!', GETDATE());
GO
