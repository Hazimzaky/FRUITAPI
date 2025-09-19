import { Request, Response, NextFunction } from 'express';
import { ApiResponse, PaginatedResponse } from '../types';

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */

/**
 * 
 * @param data - Response data
 * @param message - Optional success message
 * @param statusCode - HTTP status code (default: 200)
 */
export const successResponse = (
  res: Response,
  data: any = null,
  message?: string,
  statusCode: number = 200
): void => {
  const response: ApiResponse = {
    success: true,
    data,
    message
  };

  res.status(statusCode).json(response);
};

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */

/**
 * 
 * @param res - 
 * @param data - 
 * @param pagination -
 * @param message - 
 */
export const paginatedResponse = (
  res: Response,
  data: any[],
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  },
  message?: string
): void => {
  const response: PaginatedResponse<any> = {
    data,
    pagination
  };

  const apiResponse: ApiResponse<PaginatedResponse<any>> = {
    success: true,
    data: response,
    message
  };

  res.status(200).json(apiResponse);
};

/**
 * الجزء بتاع الايرور هاندلر
 * يعمل الايرور هاندلر على كل الايرورز في التطبيق و يعيد ايرور ريسبونس بتاعها
 */

/**
 * 
 * @param res -
 * @param data - 
 * @param message -
 */
export const createdResponse = (
  res: Response,
  data: any,
  message: string = 'Resource created successfully'
): void => {
  successResponse(res, data, message, 201);
};

/**
 * يحدث الريسبونس هاندلر للمنتجات المختلفة
 * @param res - رد سريع للايرورز المختلفة
 * @param data - تحديث للداتا المختلفة
 * @param message - اختياري success message
 */
export const updatedResponse = (
  res: Response,
  data: any,
  message: string = 'Resource updated successfully'
): void => {
  successResponse(res, data, message, 200);
};

/**
 * هاندلر للردود المحذوفة
 * @param res - رد سريع 
 * @param message - رسالة نجاح اختيارية
 */
export const deletedResponse = (
  res: Response,
  message: string = 'Resource deleted successfully'
): void => {
  successResponse(res, null, message, 200);
};

/**
 * الايرور الي هيطلع لو مفيش منتج بالمواصفة دي
 * @param res - الرد السريع للاوبجكت
 */
export const noContentResponse = (res: Response): void => {
  res.status(204).end();
};

/**
 * هاندل للريسبونس المختلفة
 * يضيف الريسبونس المختلفة على الريسبونس المختلفة
 */
export const responseHandler = (req: Request, res: Response, next: NextFunction): void => {
  // جزء بتاع الريسبونس المختلفة على الريسبونس المختلفة
  res.success = (data: any, message?: string, statusCode: number = 200) => {
    successResponse(res, data, message, statusCode);
  };

  res.paginated = (data: any[], pagination: any, message?: string) => {
    paginatedResponse(res, data, pagination, message);
  };

  res.created = (data: any, message?: string) => {
    createdResponse(res, data, message);
  };

  res.updated = (data: any, message?: string) => {
    updatedResponse(res, data, message);
  };

  res.deleted = (message?: string) => {
    deletedResponse(res, message);
  };

  res.noContent = () => {
    noContentResponse(res);
  };

  next();
};

// جزء بتاع الريسبونس المختلفة على الريسبونس المختلفة
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
