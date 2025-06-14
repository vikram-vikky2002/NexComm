USE [master]
GO

IF (EXISTS (SELECT name FROM master.dbo.sysdatabases 
WHERE ('[' + name + ']' = N'NexCommDB' OR name = N'NexCommDB')))
DROP DATABASE NexCommDB

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
    userId INT NOT NULL PRIMARY KEY IDENTITY(100,1),
    userName VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES [role](roleId),
    emailId VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    newUser BIT DEFAULT 1,
    password VARCHAR(255),
    lastLogin DATETIME DEFAULT GETDATE(),
    live BIT DEFAULT 0,
    isAdmin BIT DEFAULT 0
);
GO

CREATE TABLE [chatRoom] (
    roomId INT NOT NULL PRIMARY KEY IDENTITY(100,1),
    isGroup BIT DEFAULT 0,
    groupName VARCHAR(100),
    createdBy INT NOT NULL FOREIGN KEY REFERENCES [user](userId),
    createdOn DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE [chatRoomMembers] (
    userId INT NOT NULL FOREIGN KEY REFERENCES [user](userId),
    roomId INT NOT NULL FOREIGN KEY REFERENCES [chatRoom](roomId)
);
GO

CREATE TABLE [file] (
    fileId INT NOT NULL PRIMARY KEY IDENTITY(100,1),
    userId INT NOT NULL FOREIGN KEY REFERENCES [user](userId),
    roomId INT NOT NULL FOREIGN KEY REFERENCES [chatRoom](roomId),
    path VARCHAR(255) NOT NULL,
    fileType VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE [message] (
    messageId INT NOT NULL PRIMARY KEY IDENTITY(100,1),
    userId INT NOT NULL FOREIGN KEY REFERENCES [user](userId),
    roomId INT NOT NULL FOREIGN KEY REFERENCES [chatRoom](roomId),
    text VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);
GO


SELECT * FROM chatRoomMembers WHERE userId = 101
SELECT * FROM [user]