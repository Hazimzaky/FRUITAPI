const { config } = require('../dist/config/config');
const { connectDatabase } = require('../dist/config/database');
const corsMiddleware = require('../dist/middleware/cors').default;
const { apiLimiter } = require('../dist/middleware/rateLimiter');
const { responseHandler } = require('../dist/middleware/responseHandler');
const { errorHandler, notFoundHandler } = require('../dist/middleware/errorHandler');
const routes = require('../dist/routes').default;

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

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

app.use(corsMiddleware);
app.use(compression());
app.use(apiLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(responseHandler);
app.set('trust proxy', 1);

// Initialize routes
app.use(config.server.apiPrefix, routes);

// Root endpoint
app.get('/', (req, res) => {
  res.success({
    name: 'Fruit & Vegetable E-commerce API',
    version: '1.0.0',
    description: 'RESTful API for managing fruits and vegetables',
    documentation: `${req.protocol}://${req.get('host')}${config.server.apiPrefix}/version`,
    health: `${req.protocol}://${req.get('host')}${config.server.apiPrefix}/health`
  }, 'Welcome to Fruit & Vegetable E-commerce API');
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Connect to database with retry logic
let isConnecting = false;
let connectionPromise = null;

const connectWithRetry = async () => {
  if (isConnecting && connectionPromise) {
    return connectionPromise;
  }
  
  if (isConnecting) {
    return;
  }
  
  isConnecting = true;
  connectionPromise = connectDatabase().catch((error) => {
    console.error('Database connection failed:', error);
    isConnecting = false;
    connectionPromise = null;
    // Retry after 5 seconds
    setTimeout(() => {
      connectWithRetry();
    }, 5000);
  });
  
  return connectionPromise;
};

// Initialize database connection
connectWithRetry();

module.exports = app;
