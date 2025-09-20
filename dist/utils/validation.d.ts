import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export declare const productSchema: Joi.ObjectSchema<any>;
export declare const querySchema: Joi.ObjectSchema<any>;
export declare const idSchema: Joi.ObjectSchema<any>;
export declare const validate: (schema: Joi.ObjectSchema, property?: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => void;
export declare const productUpdateSchema: Joi.ObjectSchema<any>;
export declare const bulkOperationSchema: Joi.ObjectSchema<any>;
//# sourceMappingURL=validation.d.ts.map