const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
// Security headers
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏏 CricConnect API is running!',
    version: '1.0.0',
    endpoints: {
      matches: '/api/matches',
      chat: '/api/chat',
      predictions: '/api/predictions'
    }
  });
});

// API Routes
app.use('/api/matches', require('./routes/matches'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/predictions', require('./routes/predictions'));

// 404 handler - Must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware - Must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(50));
  console.log(`🏏 CricConnect Backend Server`);
  console.log('='.repeat(50));
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log('='.repeat(50));
  console.log('');
  console.log('📋 Available Endpoints:');
  console.log(`   GET    http://localhost:${PORT}/api/matches`);
  console.log(`   GET    http://localhost:${PORT}/api/matches/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/chat`);
  console.log(`   POST   http://localhost:${PORT}/api/chat`);
  console.log(`   GET    http://localhost:${PORT}/api/predictions`);
  console.log(`   GET    http://localhost:${PORT}/api/predictions/:id`);
  console.log('='.repeat(50));
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});