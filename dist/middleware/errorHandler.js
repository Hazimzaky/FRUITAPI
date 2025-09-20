"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = exports.ErrorType = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["DUPLICATE_ERROR"] = "DUPLICATE_ERROR";
    ErrorType["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ErrorType["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ErrorType["RATE_LIMIT_ERROR"] = "RATE_LIMIT_ERROR";
    ErrorType["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorType["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorType["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorType = ErrorType.INTERNAL_SERVER_ERROR;
    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorType = error.statusCode === 400 ? ErrorType.VALIDATION_ERROR :
            error.statusCode === 404 ? ErrorType.NOT_FOUND :
                error.statusCode === 409 ? ErrorType.DUPLICATE_ERROR :
                    error.statusCode === 401 ? ErrorType.AUTHENTICATION_ERROR :
                        error.statusCode === 403 ? ErrorType.AUTHORIZATION_ERROR :
                            error.statusCode === 429 ? ErrorType.RATE_LIMIT_ERROR :
                                error.statusCode >= 500 ? ErrorType.INTERNAL_SERVER_ERROR :
                                    ErrorType.INTERNAL_SERVER_ERROR;
    }
    else if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorType = ErrorType.VALIDATION_ERROR;
    }
    else if (error.name === 'MongoServerError' && error.code === 11000) {
        statusCode = 409;
        message = 'Duplicate entry found';
        errorType = ErrorType.DUPLICATE_ERROR;
    }
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
        errorType = ErrorType.VALIDATION_ERROR;
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
        errorType = ErrorType.AUTHENTICATION_ERROR;
    }
    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
        errorType = ErrorType.AUTHENTICATION_ERROR;
    }
    console.error(`[${new Date().toISOString()}] ${errorType}: ${message}`, {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    const errorResponse = {
        success: false,
        data: null,
        message,
        error: {
            type: errorType,
            code: statusCode,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method
        }
    };
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    const errorResponse = {
        success: false,
        data: null,
        message: `Route ${req.method} ${req.url} not found`,
        error: {
            type: ErrorType.NOT_FOUND,
            code: 404,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method
        }
    };
    res.status(404).json(errorResponse);
};
exports.notFoundHandler = notFoundHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
exports.createError = {
    notFound: (resource = 'Resource') => new ApiError(`${resource} not found`, 404),
    duplicate: (field) => new ApiError(`${field} already exists`, 409),
    validation: (message) => new ApiError(message, 400),
    unauthorized: (message = 'Unauthorized access') => new ApiError(message, 401),
    forbidden: (message = 'Access forbidden') => new ApiError(message, 403),
    internal: (message = 'Internal server error') => new ApiError(message, 500),
    badRequest: (message) => new ApiError(message, 400)
};
//# sourceMappingURL=errorHandler.js.map