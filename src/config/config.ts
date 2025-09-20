import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * application configuration
 * centralized configuration management
 */

interface Config {
  server: {
    port: number;
    nodeEnv: string;
    apiVersion: string;
    apiPrefix: string;
  };
  database: {
    mongodbUri: string;
    mongodbTestUri: string;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  cors: {
    origin: string;
  };
}

const config: Config = {
  server: {
    port: parseInt(process.env.PORT || '4000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    apiVersion: process.env.API_VERSION || 'v1',
    apiPrefix: process.env.API_PREFIX || '/api'
  },
  database: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fruit_vegetable_api',
    mongodbTestUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/fruit_vegetable_api_test'
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4000'
  }
};

// validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file or environment configuration');
  process.exit(1);
}

export { config };
