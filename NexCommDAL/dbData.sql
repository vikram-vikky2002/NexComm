USE NexCommDB;
GO


-- Insert Roles
INSERT INTO [role] (roleId, roleName) VALUES
('admin', 'Administrator'),
('mod', 'Moderator'),
('user', 'Regular User');

-- Insert Users
INSERT INTO [user] (userName, role, phone, password, newUser, live, isAdmin) VALUES
('Alice', 'admin', '9876543210', 'alicepass', 0, 1, 1),
('Bob', 'mod', '8765432109', 'bobpass', 0, 1, 0),
('Charlie', 'user', '7654321098', 'charliepass', 1, 0, 0),
('Daisy', 'user', '6543210987', 'daisypass', 1, 0, 0),
('Ethan', 'user', '5432109876', 'ethanpass', 0, 1, 0),
('Fiona', 'user', '4321098765', 'fionapass', 0, 0, 0),
('George', 'mod', '3210987654', 'georgepass', 1, 1, 0),
('Hannah', 'user', '2109876543', 'hannahpass', 1, 1, 0);

-- Insert Chat Rooms (2 individual, 2 group)
INSERT INTO [chatRoom] (isGroup, createdBy) VALUES
(0, 100), -- Alice
(0, 101), -- Bob
(1, 100), -- Alice (group)
(1, 102); -- Charlie (group)

-- Insert Chat Room Members
-- Room 100: Alice & Bob (1-on-1)
INSERT INTO [chatRoomMembers] (userId, roomId) VALUES
(100, 100), (101, 100);

-- Room 101: Bob & Charlie (1-on-1)
INSERT INTO [chatRoomMembers] (userId, roomId) VALUES
(101, 101), (102, 101);

-- Room 102: Alice, Charlie, Daisy (group)
INSERT INTO [chatRoomMembers] (userId, roomId) VALUES
(100, 102), (102, 102), (103, 102);

-- Room 103: Ethan, Fiona, George, Hannah (group)
INSERT INTO [chatRoomMembers] (userId, roomId) VALUES
(104, 103), (105, 103), (106, 103), (107, 103);

-- Insert Files
INSERT INTO [file] (userId, path, fileType) VALUES
(100, '/uploads/doc1.pdf', 'pdf'),
(101, '/uploads/image1.jpg', 'image'),
(102, '/uploads/code1.js', 'text'),
(104, '/uploads/data.csv', 'csv'),
(105, '/uploads/presentation.pptx', 'ppt'),
(106, '/uploads/photo.png', 'image');

-- Insert Messages
INSERT INTO [message] (userId, text) VALUES
(100, 'Hey Bob, how are you?'),
(101, 'Doing great Alice, thanks!'),
(102, 'Excited for the group discussion.'),
(103, 'Let’s start the project today.'),
(104, 'Shared the dataset in the group.'),
(105, 'Uploaded the slides.'),
(106, 'Team meeting at 5 PM.'),
(107, 'I’ll be joining late.');

-- Additional Messages for Stress Testing
INSERT INTO [message] (userId, text)
SELECT userId, 'Test message #' + CAST(ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS VARCHAR)
FROM (
    SELECT TOP 50 userId FROM [user] ORDER BY NEWID()
) AS randomUsers;
