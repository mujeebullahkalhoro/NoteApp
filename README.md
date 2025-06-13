# 📝 NoteAPP – Your Smart Note-Taking App

NoteAPP is a full-stack MERN (MongoDB, Express, React, Node) application built to help users capture, organize, and manage their notes with ease. It includes secure JWT-based authentication, password reset via email, reminders, favorites, importance tagging, and a sleek dashboard interface.

![NoteApp](https://github.com/mujeebullahkalhoro/NoteApp/blob/8166bb798c3974c9c4af2980b9839e15d7bbc57b/screenshot.png)
![NoteApp](https://github.com/mujeebullahkalhoro/NoteApp/blob/6e10a6c70c8ca913c26c70bcf889285ea315949d/image.png)

---

## 🚀 Features

### 🔐 User Authentication
- Secure JWT-based login & registration
- Refresh token and access token logic using HTTP-only cookies
- Password reset via email (Nodemailer)
- Protected routes with middleware

### 📝 Notes Management
- Create, read, update, and delete notes
- Mark notes as **important** or **favorite**
- Filter/search notes by title or content
  

### ⏰ Reminders
- Set reminder date/time for any note
- Reminder emails sent via Nodemailer
- Scheduler (like cron) for background jobs

### ⚙️ Admin & Security
- Passwords hashed with bcrypt
- Tokens stored securely via cookies
- Backend routes protected using `authenticateUser` middleware

---

## 💻 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Formik & Yup (form handling + validation)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for auth (access + refresh tokens)
- Nodemailer for emails
- dotenv for env config

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mujeebullahkalhoro/NoteApp.git
cd NoteApp

2. Backend Setup
cd backend
npm install
cp .env.example .env  # create and update environment variables
node server.js
3. Frontend Setup
cd ../frontend
npm install
npm run dev
🌐 .env File Variables (Backend)
# MongoDB
MONGO_URL=your_mongodb_connection_string

# Server
PORT=5000
CLIENT_URL=http://localhost:5173

# JWT Tokens
JWT_SECRET=your_access_token_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret_key

# Nodemailer SMTP Email Config
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_or_app_password


🙌 Author
Made with ❤️ by Mujeebullah Kalhoro

GitHub: @mujeebullahkalhoro

