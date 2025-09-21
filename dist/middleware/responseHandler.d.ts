import { Request, Response, NextFunction } from 'express';
export declare const successResponse: (res: Response, data?: any, message?: string, statusCode?: number) => void;
export declare const paginatedResponse: (res: Response, data: any[], pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}, message?: string) => void;
export declare const createdResponse: (res: Response, data: any, message?: string) => void;
export declare const updatedResponse: (res: Response, data: any, message?: string) => void;
export declare const deletedResponse: (res: Response, message?: string) => void;
export declare const noContentResponse: (res: Response) => void;
export declare const responseHandler: (req: Request, res: Response, next: NextFunction) => void;
declare global {
    namespace Express {
        interface Response {
            success: (data: any, message?: string, statusCode?: number) => void;
            paginated: (data: any[], pagination: any, message?: string) => void;
            created: (data: any, message?: string) => void;
            updated: (data: any, message?: string) => void;
            deleted: (message?: string) => void;
            noContent: () => void;
        }
    }
}
//# sourceMappingURL=responseHandler.d.ts.map