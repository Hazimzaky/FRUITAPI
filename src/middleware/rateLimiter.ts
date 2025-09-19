import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

/**
 * Rate limiting middleware
 * Prevents abuse by limiting the number of requests per IP
 */

// general API rate limiter
export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs, // 15 minutes
  max: config.rateLimit.maxRequests, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    data: null,
    message: 'Too many requests from this IP, please try again later',
    error: {
      type: 'RATE_LIMIT_ERROR',
      code: 429,
      retryAfter: Math.ceil(config.rateLimit.windowMs / 1000)
    }
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      data: null,
      message: 'Too many requests from this IP, please try again later',
      error: {
        type: 'RATE_LIMIT_ERROR',
        code: 429,
        retryAfter: Math.ceil(config.rateLimit.windowMs / 1000),
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method
      }
    });
  }
});

// strict rate limiter for sensitive operations
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
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

// create product rate limiter (more restrictive)
export const createProductLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 product creations per hour
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

// search rate limiter
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 search requests per minute
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
