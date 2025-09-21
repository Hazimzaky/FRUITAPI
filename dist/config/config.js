"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
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
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:4000'
    }
};
exports.config = config;
const requiredEnvVars = [
    'MONGODB_URI'
];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars);
    console.error('Please check your .env file or environment configuration');
    process.exit(1);
}
//# sourceMappingURL=config.js.map