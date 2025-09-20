const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');

const app = express();

// Global variable to track connection status
let isConnected = false;
let connectionPromise = null;

// Database connection function
const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise(async (resolve, reject) => {
    try {
      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      
      await mongoose.connect(mongoUri, {
        maxPoolSize: 1,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 10000,
        bufferCommands: false,
        retryWrites: true,
        retryReads: true,
      });

      isConnected = true;
      console.log('✅ Connected to MongoDB');
      resolve();
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      isConnected = false;
      connectionPromise = null;
      reject(error);
    }
  });

  return connectionPromise;
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Initialize middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Response handler middleware
app.use((req, res, next) => {
  res.success = (data, message = 'Success') => {
    res.json({
      success: true,
      data,
      message
    });
  };
  
  res.error = (message = 'Error', statusCode = 400, error = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      error: error ? {
        type: error.name || 'ERROR',
        code: error.code || statusCode,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      } : null
    });
  };
  
  next();
});

app.set('trust proxy', 1);

// Import routes after database connection is established
const productRoutes = require('../dist/routes/productRoutes').default;

// API routes
app.use('/api', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.success({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production'
  }, 'API is running');
});

// Version endpoint
app.get('/api/version', (req, res) => {
  res.success({
    name: 'Fruit & Vegetable E-commerce API',
    version: '1.0.0',
    description: 'RESTful API for managing fruits and vegetables',
    endpoints: {
      products: '/api/products',
      health: '/api/health',
      version: '/api/version'
    }
  }, 'API Version Information');
});

// Root endpoint
app.get('/', (req, res) => {
  res.success({
    name: 'Fruit & Vegetable E-commerce API',
    version: '1.0.0',
    description: 'RESTful API for managing fruits and vegetables',
    documentation: `${req.protocol}://${req.get('host')}/api/version`,
    health: `${req.protocol}://${req.get('host')}/api/health`
  }, 'Welcome to Fruit & Vegetable E-commerce API');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: {
      type: 'NOT_FOUND',
      code: 404,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: {
      type: 'INTERNAL_SERVER_ERROR',
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    }
  });
});

module.exports = app;
