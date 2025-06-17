# NexComm - Real-time Chat Application

## Overview

NexComm is a modern, real-time chat application built using Angular for the frontend and ASP.NET Core for the backend. It provides a secure and feature-rich messaging platform with support for both one-on-one chats and group chats.

## Features

### Core Features
- Real-time messaging with WebSocket support
- Secure authentication using JWT
- User management and role-based access control
- Group chat functionality
- File sharing capabilities
- Responsive design for all devices
- Modern glassmorphism UI design
- Message polling and auto-scrolling

### Security
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password handling
- Token expiration and refresh
- Protected routes

### User Interface
- Modern glassmorphism design
- Responsive navigation bars (User and Admin)
- Smooth animations and transitions
- Blur effects and overlays
- Custom error handling
- Loading states

## Tech Stack

### Frontend
- Angular 17+
- TypeScript
- Bootstrap 5
- Font Awesome icons
- Angular Material
- Angular Router
- RxJS

### Backend
- ASP.NET Core 8+
- Entity Framework Core
- SQL Server
- WebSocket Protocol
- JWT Authentication
- CORS Policy

## Project Structure

```
NexComm/
├── NexCommApp/              # Frontend Angular Application
│   ├── app/                # Angular components and services
│   │   ├── Components/     # UI components
│   │   │   ├── chat/      # Chat components
│   │   │   ├── login/     # Login components
│   │   │   ├── user-nav-bar/ # User navigation
│   │   │   └── admin-nav-bar/ # Admin navigation
│   │   ├── Models/        # Data models
│   │   └── services/      # Service classes
│   ├── assets/            # Static assets
│   ├── environments/      # Environment configurations
│   └── styles/            # Global styles
│
└── NexCommWebServices/    # Backend .NET Services
    ├── Controllers/      # API controllers
    ├── Models/          # Data models
    ├── Services/        # Business logic
    └── Data/            # Database context and migrations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- .NET 8 SDK
- SQL Server
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/NexComm.git
```

2. Install frontend dependencies:
```bash
cd NexCommApp
npm install
```

3. Install backend dependencies:
```bash
cd NexCommWebServices
```

4. Create database:
```bash
dotnet ef database update
```

5. Start the backend:
```bash
dotnet run
```

6. Start the frontend:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Usage

1. **Login**
   - Access the login page at `/login`
   - Enter your credentials
   - Admin users will be redirected to admin dashboard
   - Regular users will be redirected to chats page

2. **Chat Features**
   - Create new chats (one-on-one or group)
   - Send and receive messages in real-time
   - Share files
   - View message timestamps
   - Auto-scrolling for new messages

3. **Navigation**
   - Responsive navigation bar
   - Menu toggle for mobile devices
   - Blur effects for overlays
   - Smooth transitions

## Security Implementation

### Authentication
- JWT tokens with expiration
- Token storage in localStorage
- Protected routes using AuthGuard
- Role-based access control
- Secure password hashing

### Data Protection
- HTTPS support
- Input validation
- XSS protection
- CSRF protection
- SQL injection prevention

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

For support or questions, please contact:
- Email: support@nexcomm.com
- GitHub: @NexComm

## Acknowledgments

- Angular team for the amazing framework
- .NET Core team for the robust backend platform
- All contributors to this project

## Version History

- 1.0.0 - Initial release with core chat functionality
- 1.1.0 - Added group chat support
- 1.2.0 - Implemented JWT authentication
- 1.3.0 - Added file sharing
- 1.4.0 - Improved UI/UX with glassmorphism design
- 1.5.0 - Added real-time message updates

## API Documentation

The API documentation is available at `/api-docs` when the backend is running.

### Endpoints

- `POST /api/auth/login` - User login
- `GET /api/chat/rooms` - Get chat rooms
- `POST /api/chat/rooms` - Create chat room
- `GET /api/chat/messages` - Get messages
- `POST /api/chat/messages` - Send message
- `POST /api/chat/files` - Upload file

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Ensure backend is running
   - Check WebSocket connection
   - Verify CORS settings

2. **Authentication Issues**
   - Clear browser cache
   - Check token expiration
   - Verify credentials

3. **Performance Issues**
   - Monitor WebSocket connections
   - Check browser console
   - Review backend logs

## Best Practices

### Development
- Use environment variables for configuration
- Implement proper error handling
- Write unit tests
- Follow coding standards
- Use meaningful commit messages

### Security
- Never commit sensitive data
- Use environment-specific configurations
- Implement proper validation
- Follow OWASP guidelines
- Regular security audits

## Future Improvements

1. **Feature Enhancements**
   - Video calling
   - Voice messages
   - Emoji support
   - Message reactions
   - Typing indicators

2. **Performance**
   - WebSocket optimization
   - Message caching
   - Image compression
   - Lazy loading

3. **Security**
   - Two-factor authentication
   - Rate limiting
   - Enhanced encryption
   - Audit logging

4. **UI/UX**
   - Dark mode
   - Custom themes
   - Better mobile optimization
   - Improved accessibility

## Contributing Guidelines

1. Follow the coding style
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation
5. Create feature branches
6. Follow the pull request template

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed
4. Contact the support team

## Credits

Special thanks to all contributors and open-source projects used in this project:
- Angular
- .NET Core
- Bootstrap
- Font Awesome
- And many more...
