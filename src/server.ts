import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config } from './config/config';
import { connectDatabase } from './config/database';
import corsMiddleware from './middleware/cors';
import { apiLimiter } from './middleware/rateLimiter';
import { responseHandler } from './middleware/responseHandler';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import routes from './routes';

/**
 * Express Server Setup
 * Main application entry point
 */

class Server {
  public app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.server.port;
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize all middleware
   */
  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
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
    this.app.use(corsMiddleware);

    // Compression middleware
    this.app.use(compression());

    // Rate limiting
    this.app.use(apiLimiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging middleware
    if (config.server.nodeEnv === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }

    // Custom response handler
    this.app.use(responseHandler);

    // Trust proxy (for rate limiting behind reverse proxy)
    this.app.set('trust proxy', 1);
  }

  /**
   * Initialize all routes
   */
  private initializeRoutes(): void {
    // API routes
    this.app.use(config.server.apiPrefix, routes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.success({
        name: 'Fruit & Vegetable E-commerce API',
        version: '1.0.0',
        description: 'RESTful API for managing fruits and vegetables',
        documentation: `${req.protocol}://${req.get('host')}${config.server.apiPrefix}/version`,
        health: `${req.protocol}://${req.get('host')}${config.server.apiPrefix}/health`
      }, 'Welcome to Fruit & Vegetable E-commerce API');
    });
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    // 404 handler for undefined routes
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  /**
   * Start the server
   */
  public async start(): Promise<void> {
    try {
      // Connect to database
      await connectDatabase();

      // Start server
      this.app.listen(this.port, () => {
        console.log(`
 Server is running!
 Environment: ${config.server.nodeEnv}
 Port: ${this.port}
 API Base URL: http://localhost:${this.port}${config.server.apiPrefix}
 Documentation: http://localhost:${this.port}${config.server.apiPrefix}/version
  Health Check: http://localhost:${this.port}${config.server.apiPrefix}/health
        `);
      });

      // Handle uncaught exceptions
      process.on('uncaughtException', (error: Error) => {
        console.error('❌ Uncaught Exception:', error);
        process.exit(1);
      });

      // Handle unhandled promise rejections
      process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
        console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
      });

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  /**
   * Get Express app instance
   */
  public getApp(): express.Application {
    return this.app;
  }
}

// Create and start server
const server = new Server();

// Start server if this file is run directly
if (require.main === module) {
  server.start();
}

export default server;
