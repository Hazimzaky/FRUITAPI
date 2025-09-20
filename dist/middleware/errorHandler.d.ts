import { Request, Response, NextFunction } from 'express';
export declare class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare enum ErrorType {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    DUPLICATE_ERROR = "DUPLICATE_ERROR",
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
    AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
    RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR"
}
export declare const errorHandler: (error: Error | ApiError, req: Request, res: Response, next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, res: Response) => void;
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export declare const createError: {
    notFound: (resource?: string) => ApiError;
    duplicate: (field: string) => ApiError;
    validation: (message: string) => ApiError;
    unauthorized: (message?: string) => ApiError;
    forbidden: (message?: string) => ApiError;
    internal: (message?: string) => ApiError;
    badRequest: (message: string) => ApiError;
};
//# sourceMappingURL=errorHandler.d.ts.map