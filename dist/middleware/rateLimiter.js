"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLimiter = exports.createProductLimiter = exports.strictLimiter = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config/config");
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.rateLimit.windowMs,
    max: config_1.config.rateLimit.maxRequests,
    message: {
        success: false,
        data: null,
        message: 'Too many requests from this IP, please try again later',
        error: {
            type: 'RATE_LIMIT_ERROR',
            code: 429,
            retryAfter: Math.ceil(config_1.config.rateLimit.windowMs / 1000)
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            data: null,
            message: 'Too many requests from this IP, please try again later',
            error: {
                type: 'RATE_LIMIT_ERROR',
                code: 429,
                retryAfter: Math.ceil(config_1.config.rateLimit.windowMs / 1000),
                timestamp: new Date().toISOString(),
                path: req.url,
                method: req.method
            }
        });
    }
});
exports.strictLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        data: null,
        message: 'Too many sensitive requests from this IP, please try again later',
        error: {
            type: 'RATE_LIMIT_ERROR',
            code: 429,
            retryAfter: 900
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
exports.createProductLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        data: null,
        message: 'Too many product creation requests, please try again later',
        error: {
            type: 'RATE_LIMIT_ERROR',
            code: 429,
            retryAfter: 3600
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
exports.searchLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        data: null,
        message: 'Too many search requests, please try again later',
        error: {
            type: 'RATE_LIMIT_ERROR',
            code: 429,
            retryAfter: 60
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rateLimiter.js.map