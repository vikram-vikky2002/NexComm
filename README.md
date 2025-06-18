
# NexComm 💬

**NexComm** is a modern, real-time chat application built for secure messaging over a **LAN network** without requiring internet access. It offers both one-on-one and group communication with real-time updates, JWT-based authentication, and a clean, responsive UI.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication Flow](#authentication-flow)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🔁 Real-time Chat
- One-on-one direct messaging
- Group chat functionality
- Real-time updates using **WebSocket**

### 🔐 Security
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password handling and token validation
- Refresh token mechanism

### 🎨 User Interface
- Modern **Glassmorphism** UI
- Responsive layout (desktop-first)
- Smooth transitions and animations
- Admin/User navigation panels
- File sharing support (coming soon)

---

## 🧱 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | Angular 17+, TypeScript, Bootstrap 5, Angular Material |
| Backend     | ASP.NET Core 8+, Entity Framework Core |
| Database    | SQL Server |
| Auth        | JWT (JSON Web Tokens) |
| Realtime    | WebSocket Protocol |

---

## 🏗️ Architecture

The project follows a modular, layered architecture with a clear separation of concerns:

```
NexComm/
│
├── NexCommApp/               # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/         # Login/Register components
│   │   │   ├── chat/         # Chat UI
│   │   │   ├── services/     # API and auth services
│   │   │   └── admin/        # Admin dashboard and features
│   │   └── assets/
│
├── NexCommWebServices/       # ASP.NET Core Backend
│   ├── Controllers/          # API controllers
│   ├── Models/               # Data models
│   ├── Services/             # Business logic
│   ├── DAL/                  # Entity Framework DB context and repository
│   └── Program.cs
│
└── Database/                 # SQL Server DB via EF Core
```

---

## ⚙️ Installation

### 🧾 Prerequisites
- Node.js (v18+)
- npm (v9+)
- .NET SDK (v8+)
- Angular CLI (`npm install -g @angular/cli`)
- SQL Server (Express or higher)

### 🚀 Setup Steps

#### 🖥️ Frontend (Angular)
```bash
cd NexCommApp
npm install
ng serve
```

#### 🧠 Backend (ASP.NET Core)
```bash
cd NexCommWebServices
dotnet restore
dotnet run
```

Ensure your **SQL Server** connection string is correctly set in `appsettings.json`.

---

## 🛠️ Usage

- Visit `http://localhost:4200` for the Angular frontend
- Register or login as a User or Admin
- Chat in real-time with other users
- Admins can:
  - View all users
  - Monitor chat rooms
  - Manage application roles

---

## 🔐 Authentication Flow

1. User logs in and receives a **JWT token**
2. Token is stored in local storage
3. Protected routes verify token validity
4. If expired, the user is logged out (refresh token support planned)

---

## 📸 Screenshots *(Optional)*

> You can add screenshots here later using:
```md
![Login Page](screenshots/login.png)
![Chat Interface](screenshots/chat.png)
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit and push (`git commit -m 'Add feature'`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 💡 Future Enhancements

- ✅ File sharing
- ✅ Admin controls for monitoring chat
- 📅 Video/voice call (WebRTC)
- 📦 Dockerization for deployment
- 📊 Chat analytics

---

## 🙌 Credits

Developed by **[Vikram K R](https://github.com/vikram-vikky2002)**, **[C Rajesh]()**, **[K Kavin]()**, **[Sharath]()** and **[Vivek]()**.

---
