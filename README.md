# TaskMaster — Full-Stack Task Management SaaS Application

TaskMaster is a modern, full-stack productivity web application designed to help individuals, students, developers, and teams plan, organize, prioritize, and track their tasks effortlessly. Built with a sleek glassmorphic UI, dark/light theme switching, interactive charts, and real-time Socket.IO synchronization.

---

## 🌟 Key Features

- **Productivity Dashboard**: Real-time statistics for total, completed, in-progress, and overdue tasks with custom trend visualizers.
- **Task Management (CRUD)**: Create, edit, search, filter (by status, priority, category, due date), sort, and delete tasks.
- **Priority & Due Date Tracking**: Assign High, Medium, or Low priority badges, target due dates, and custom tags (`React`, `College`, etc.).
- **Interactive Calendar**: View upcoming deadlines mapped out on a monthly calendar grid.
- **Custom Categories**: Organize work into categories (*Personal*, *Work*, *Study*, *Development*, *College*, etc.) with real-time completion progress bars.
- **Productivity Analytics**: Recharts charts for weekly and monthly task completion rates and priority breakdowns.
- **Real-Time Synchronization**: Instant task updates and deadline notifications across browser sessions via Socket.IO.
- **Notification System**: Automated reminders for upcoming and overdue tasks with unread badge counter.
- **Secure Authentication**: JWT token authentication with bcrypt password hashing and user-isolated database scoping.
- **Dark & Light Mode**: Seamless dark and light mode theme toggle with persistent preferences.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile with drawer menus and dynamic grid layouts.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS + Vanilla CSS Variables (Dark/Light glassmorphism)
- **State & Router**: React Context API, React Router DOM v6
- **Animations & Icons**: Framer Motion, Lucide React
- **Data Visuals**: Recharts
- **HTTP Client & Sockets**: Axios, Socket.io-client

### Backend
- **Runtime**: Node.js & Express.js
- **Database ODM**: MongoDB & Mongoose (with automated in-memory MongoDB fallback for instant local testing)
- **Security**: JWT (JsonWebToken), bcryptjs password hashing, CORS, input sanitization
- **Real-time Engine**: Socket.IO

---

## 📁 Folder Structure

```text
task-management-app/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route logic (Auth, Task, Category, Notification)
│   ├── middleware/      # JWT protection & error handler
│   ├── models/          # Mongoose schemas (User, Task, Category, Notification)
│   ├── routes/          # Express API endpoints
│   ├── services/        # Socket.IO emitter helpers
│   ├── utils/           # Seed data generator for demo testing
│   ├── server.js        # Express server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Layout, Common (Modal, Toast, Skeleton), Tasks, Dashboard
│   │   ├── context/     # Auth, Theme, Socket Context Providers
│   │   ├── pages/       # Landing, Login, Register, Dashboard, Tasks, Calendar, Categories, Analytics, Profile, Settings
│   │   ├── services/    # Axios API client modules
│   │   ├── App.jsx      # Protected & Public routing
│   │   ├── main.jsx     # App entry point
│   │   └── index.css    # Tailwind & CSS design system
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── .env.example
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Install Backend Dependencies & Start Server
```bash
cd backend
npm install
npm run dev
```
*Note: The backend automatically checks for local MongoDB at `mongodb://127.0.0.1:27017/taskmanager`. If MongoDB is not running locally, it seamlessly launches an in-memory MongoDB server (`mongodb-memory-server`) so you can run and test the app immediately without extra database setup!*

### 3. Install Frontend Dependencies & Start Client
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 🔑 Instant Demo Account

To quickly test pre-populated tasks, calendar deadlines, and visual analytics charts without registering a new account, use:

- **Email**: `demo@taskmaster.com`
- **Password**: `password123`

*(Or click the "Instant Demo Login" button directly on the Login page).*

---

## 📡 REST API Documentation

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user and return JWT
- `GET /api/auth/me` — Fetch currently authenticated user
- `PUT /api/auth/profile` — Update user profile details & avatar
- `PUT /api/auth/change-password` — Update user password
- `DELETE /api/auth/account` — Delete account and all user data

### Task Routes (`/api/tasks`)
- `GET /api/tasks` — Fetch user tasks (supports `search`, `status`, `priority`, `category`, `sortBy`)
- `POST /api/tasks` — Create new task
- `GET /api/tasks/:id` — Get task by ID
- `PUT /api/tasks/:id` — Update full task details
- `PATCH /api/tasks/:id/status` — Quick toggle status (`To Do`, `In Progress`, `Completed`)
- `DELETE /api/tasks/:id` — Delete task

### Category Routes (`/api/categories`)
- `GET /api/categories` — Fetch categories with task count metrics
- `POST /api/categories` — Create custom category
- `PUT /api/categories/:id` — Update category
- `DELETE /api/categories/:id` — Delete category

### Notification Routes (`/api/notifications`)
- `GET /api/notifications` — Fetch user notifications & scan task deadlines
- `PATCH /api/notifications/:id/read` — Mark notification as read

---

## 🌐 Deployment Instructions

### Deploy Frontend (Vercel)
1. Push repository to GitHub.
2. Import `frontend/` directory into Vercel.
3. Build Command: `npm run build`, Output Directory: `dist`.
4. Add environment variable: `VITE_API_URL=https://your-backend-render-url.onrender.com/api`.

### Deploy Backend (Render / Railway)
1. Import `backend/` directory into Render.
2. Environment: Node, Build Command: `npm install`, Start Command: `node server.js`.
3. Set environment variables:
   - `PORT=5000`
   - `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/taskmanager`
   - `JWT_SECRET=your_production_secret_key`
   - `CLIENT_URL=https://your-frontend-vercel-url.vercel.app`

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
