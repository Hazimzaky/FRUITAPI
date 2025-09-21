"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const config_1 = require("./config/config");
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("./middleware/cors"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const responseHandler_1 = require("./middleware/responseHandler");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.config.server.port;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)({
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
        this.app.use(cors_1.default);
        this.app.use((0, compression_1.default)());
        this.app.use(rateLimiter_1.apiLimiter);
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        if (config_1.config.server.nodeEnv === 'development') {
            this.app.use((0, morgan_1.default)('dev'));
        }
        else {
            this.app.use((0, morgan_1.default)('combined'));
        }
        this.app.use(responseHandler_1.responseHandler);
        this.app.set('trust proxy', 1);
    }
    initializeRoutes() {
        this.app.use(config_1.config.server.apiPrefix, routes_1.default);
        this.app.get('/', (req, res) => {
            res.success({
                name: 'Fruit & Vegetable E-commerce API',
                version: '1.0.0',
                description: 'RESTful API for managing fruits and vegetables',
                documentation: `${req.protocol}://${req.get('host')}${config_1.config.server.apiPrefix}/version`,
                health: `${req.protocol}://${req.get('host')}${config_1.config.server.apiPrefix}/health`
            }, 'Welcome to Fruit & Vegetable E-commerce API');
        });
    }
    initializeErrorHandling() {
        this.app.use(errorHandler_1.notFoundHandler);
        this.app.use(errorHandler_1.errorHandler);
    }
    async start() {
        try {
            await (0, database_1.connectDatabase)();
            this.app.listen(this.port, () => {
                console.log(`
 Server is running!
 Environment: ${config_1.config.server.nodeEnv}
 Port: ${this.port}
 API Base URL: http://localhost:${this.port}${config_1.config.server.apiPrefix}
 Documentation: http://localhost:${this.port}${config_1.config.server.apiPrefix}/version
  Health Check: http://localhost:${this.port}${config_1.config.server.apiPrefix}/health
        `);
            });
            process.on('uncaughtException', (error) => {
                console.error('❌ Uncaught Exception:', error);
                process.exit(1);
            });
            process.on('unhandledRejection', (reason, promise) => {
                console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
                process.exit(1);
            });
        }
        catch (error) {
            console.error('❌ Failed to start server:', error);
            process.exit(1);
        }
    }
    getApp() {
        return this.app;
    }
}
const server = new Server();
if (require.main === module) {
    server.start();
}
exports.default = server;
//# sourceMappingURL=server.js.map