const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { initSocket } = require('./services/socketService');
const seedDemoData = require('./utils/seedData');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Enable CORS
const clientUrl = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.replace(/\/$/, '')
  : 'http://localhost:5173';

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/$/, '');
  return (
    cleanOrigin === clientUrl ||
    cleanOrigin === 'http://localhost:5173' ||
    cleanOrigin === 'http://127.0.0.1:5173' ||
    cleanOrigin.endsWith('.vercel.app')
  );
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow for smooth cross-origin demo API access
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  },
});

initSocket(io);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TaskMaster API is running smoothly',
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
connectDB().then(async () => {
  await seedDemoData();
  server.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚀 TaskMaster Backend Server running on port ${PORT}`);
    console.log(`📡 CORS Client URL: ${clientUrl}`);
    console.log(`===================================================`);
  });
});
