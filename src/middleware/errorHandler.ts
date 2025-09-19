import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * الجزء بتاع الايرور كلاس بتاع الايرورز
 */
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * جزء بتاع الايرور تيبز للايرورز
 */
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ERROR = 'DUPLICATE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR'
}

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */
export const errorHandler = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorType = ErrorType.INTERNAL_SERVER_ERROR;

  // جزء بتاع الايرورز المخصصة
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
  // جزء بتاع الايرورز المخصصة بالمونجوز
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errorType = ErrorType.VALIDATION_ERROR;
  }
  // جزء بتاع الايرورز المخصصة بالمونجوز المكررة
  else if (error.name === 'MongoServerError' && (error as any).code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry found';
    errorType = ErrorType.DUPLICATE_ERROR;
  }
  // جزء بتاع الايرورز المخصصة بالمونجوز المختلفة
  else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    errorType = ErrorType.VALIDATION_ERROR;
  }
  // جزء بتاع الايرورز المخصصة بالجوجل توكن
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    errorType = ErrorType.AUTHENTICATION_ERROR;
  }
  // جزء بتاع الايرورز المخصصة بالجوجل توكن المنتهي
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    errorType = ErrorType.AUTHENTICATION_ERROR;
  }

  // جزء بتاع اللوج على الايرورز للتشخيص (في البرودكشن, استخدم خدمة اللوج المناسبة)
  console.error(`[${new Date().toISOString()}] ${errorType}: ${message}`, {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // جزء بتاع الايرور ريسبونس
  const errorResponse: ApiResponse = {
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

/**
 * الجزء بتاع الايرور هاندلر للروتز المحذوفة
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ApiResponse = {
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

/**
 * الجزء بتاع الايرور هاندلر للروتز المحذوفة
 * يعمل الايرور هاندلر للروتز المحذوفة على كل الروتز المحذوفة و يعيد ايرور ريسبونس بتاعها
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * الجزء بتاع الايرور كريتورز للايرورز المخصصة
 */
export const createError = {
  notFound: (resource: string = 'Resource') => new ApiError(`${resource} not found`, 404),
  duplicate: (field: string) => new ApiError(`${field} already exists`, 409),
  validation: (message: string) => new ApiError(message, 400),
  unauthorized: (message: string = 'Unauthorized access') => new ApiError(message, 401),
  forbidden: (message: string = 'Access forbidden') => new ApiError(message, 403),
  internal: (message: string = 'Internal server error') => new ApiError(message, 500),
  badRequest: (message: string) => new ApiError(message, 400)
};
