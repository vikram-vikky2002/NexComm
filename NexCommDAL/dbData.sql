USE NexCommDB;
GO

INSERT INTO [role] (roleId, roleName) VALUES 
('admin', 'Administrator'),
('mod', 'Moderator'),
('user', 'Standard User');
GO

INSERT INTO [user] (userName, role, emailId, phone, newUser, password, live, isAdmin) VALUES
('Alice', 'admin', 'alice@example.com', '123-456-7890', 0, 'passAlice', 1, 1),
('Bob', 'mod', 'bob@example.com', '234-567-8901', 0, 'passBob', 1, 0),
('Charlie', 'user', 'charlie@example.com', '345-678-9012', 1, 'passCharlie', 1, 0),
('David', 'user', 'david@example.com', '456-789-0123', 1, 'passDavid', 0, 0),
('Eve', 'user', 'eve@example.com', '567-890-1234', 0, 'passEve', 1, 0),
('Frank', 'user', 'frank@example.com', '678-901-2345', 0, 'passFrank', 1, 0),
('Grace', 'mod', 'grace@example.com', '789-012-3456', 0, 'passGrace', 1, 0);
GO

-- Private chats and group chats
INSERT INTO [chatRoom] (isGroup, createdBy) VALUES
(0, 100), -- Alice creates a private chat
(0, 101), -- Bob creates a private chat
(1, 100), -- Alice creates a group chat
(1, 102); -- Charlie creates another group chat
GO

-- Private Room 100: Alice (100) + Bob (101)
-- Private Room 101: Bob (101) + Charlie (102)
-- Group Room 102: Alice (100), Bob (101), Charlie (102), David (103)
-- Group Room 103: Charlie (102), Eve (104), Frank (105), Grace (106)
INSERT INTO [chatRoomMembers] (userId, roomId) VALUES
(100, 100), (101, 100),
(101, 101), (102, 101),
(100, 102), (101, 102), (102, 102), (103, 102),
(102, 103), (104, 103), (105, 103), (106, 103);
GO

INSERT INTO [file] (userId, roomId, path, fileType) VALUES
(100, 102, '/files/project_intro.pdf', 'pdf'),
(101, 102, '/files/design_mockup.png', 'image'),
(102, 103, '/files/team_agenda.docx', 'document'),
(104, 103, '/files/meeting_notes.txt', 'text'),
(105, 103, '/files/demo_video.mp4', 'video');
GO

INSERT INTO [message] (userId, roomId, text) VALUES
(100, 100, 'Hey Bob, got a minute?'),
(101, 100, 'Sure Alice, what’s up?'),
(101, 101, 'Hi Charlie, did you review the code?'),
(102, 101, 'Yes, looks good. I added comments.'),
(100, 102, 'Welcome to the new group everyone!'),
(101, 102, 'Thanks Alice, glad to be here.'),
(102, 102, 'Let’s sync up tomorrow for updates.'),
(103, 102, 'I’m good with 10 AM.'),
(102, 103, 'Here’s the team agenda file.'),
(104, 103, 'Thanks, will check it out.'),
(105, 103, 'Shared the demo video.'),
(106, 103, 'Nice work, looks smooth!');
GO
