"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const router = (0, express_1.Router)();
router.get('/health', (req, res) => {
    res.success({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    }, 'API is running');
});
router.get('/version', (req, res) => {
    res.success({
        version: '1.0.0',
        name: 'Fruit & Vegetable E-commerce API',
        description: 'RESTful API for managing fruits and vegetables',
        endpoints: {
            products: '/api/products',
            health: '/api/health',
            version: '/api/version'
        }
    }, 'API version information');
});
router.use('/products', productRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map