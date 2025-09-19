import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * جزء الفليديشن للاسكيما باستخدام  Joi
 */

// جزء برايس فالديشن سكيما
const priceSchema = Joi.object({
  value: Joi.number().positive().required().messages({
    'number.positive': 'Price value must be positive',
    'any.required': 'Price value is required'
  }),
  currency: Joi.string().valid('USD', 'EUR', 'GBP', 'SAR', 'AED').default('USD'),
  unit: Joi.string().valid('kg', 'lb', 'piece', 'bunch', 'bag', 'box').default('kg')
});

// الجزء بتاع الكلوريز فاليديشن سكيما 
const caloriesSchema = Joi.object({
  value: Joi.number().min(0).required().messages({
    'number.min': 'Calories cannot be negative',
    'any.required': 'Calorie value is required'
  }),
  unit: Joi.string().valid('kcal', 'cal').default('kcal'),
  per: Joi.string().valid('100g', '1kg', '1 piece', '1 cup').default('100g')
});

//الفاليديشن سكيما بتاعت استخدام اكتر من لغة
const multiLanguageNameSchema = Joi.object({
  en: Joi.string().trim().min(1).max(100).required().messages({
    'string.min': 'English name cannot be empty',
    'string.max': 'English name cannot exceed 100 characters',
    'any.required': 'English name is required'
  }),
  ar: Joi.string().trim().min(1).max(100).required().messages({
    'string.min': 'Arabic name cannot be empty',
    'string.max': 'Arabic name cannot exceed 100 characters',
    'any.required': 'Arabic name is required'
  })
});

// منطقة سمات المنتج
const attributesSchema = Joi.object({
  organic: Joi.boolean().default(false),
  shelf_life: Joi.string().trim().min(1).required().messages({
    'string.min': 'Shelf life cannot be empty',
    'any.required': 'Shelf life is required'
  }),
  calories: caloriesSchema
});

// الفاليديشن سكيما للريفيوز
const reviewsSchema = Joi.object({
  average_rating: Joi.number().min(0).max(5).default(0),
  count: Joi.number().min(0).default(0),
  detailed: Joi.object({
    average: Joi.number().min(0).max(5).default(0),
    total_reviews: Joi.number().min(0).default(0)
  }).default({ average: 0, total_reviews: 0 })
});

// السكيما بتاعت المنتج الاساسي
export const productSchema = Joi.object({
  name: multiLanguageNameSchema.required(),
  category: Joi.string().valid('Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains').required().messages({
    'any.only': 'Category must be one of: Fruits, Vegetables, Herbs, Nuts, Grains',
    'any.required': 'Category is required'
  }),
  price: priceSchema.required(),
  images: Joi.array().items(
    Joi.string().uri().pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)
  ).min(1).max(10).messages({
    'array.min': 'At least one image is required',
    'array.max': 'Maximum 10 images allowed',
    'string.pattern.base': 'Image URL must be a valid HTTP/HTTPS URL ending with jpg, jpeg, png, or webp'
  }),
  description: Joi.string().trim().min(10).max(1000).required().messages({
    'string.min': 'Description must be at least 10 characters',
    'string.max': 'Description cannot exceed 1000 characters',
    'any.required': 'Description is required'
  }),
  attributes: attributesSchema.required(),
  reviews: reviewsSchema
});

// query parameters validation schema
export const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().valid('name', 'price', 'rating', 'createdAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
  category: Joi.string().valid('Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains'),
  organic: Joi.boolean(),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  search: Joi.string().trim().max(100)
}).custom((value, helpers) => {
  //  جزء بيتاكد من صحة نطاق السعر
  if (value.minPrice && value.maxPrice && value.minPrice > value.maxPrice) {
    return helpers.error('custom.priceRange');
  }
  return value;
}).messages({
  'custom.priceRange': 'Minimum price cannot be greater than maximum price'
});

// مخططات البارامتارز بتاع ال id
export const idSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.guid': 'Invalid product ID format',
    'any.required': 'Product ID is required'
  })
});

/**
 * [.x] الجزء بتاع الفاليديشن سكيما
 * @param schema - Joi schema to validate against
 * @param property - Request property to validate (body, query, params)
 */
export const validate = (schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      const response: ApiResponse = {
        success: false,
        data: null,
        message: 'Validation failed',
        errors: errorDetails
      };

      res.status(400).json(response);
      return;
    }

    // جزء بتاع استبدال البارامتارز بتاع ال request بتاع المعالجة و التنظيف
    req[property] = value;
    next();
  };
};

/**
 * الجزء بتاع الفاليديشن سكيما بتاع التحديثات على المنتجات (يسمح بالتحديثات الجزئية)
 */
export const productUpdateSchema = productSchema.fork(
  ['name', 'category', 'price', 'images', 'description', 'attributes', 'reviews'],
  (schema) => schema.optional()
);

/**
 * جزء فاليديشن عشان المعالجات الكبيرة
 */
export const bulkOperationSchema = Joi.object({
  operation: Joi.string().valid('delete', 'update').required(),
  ids: Joi.array().items(Joi.string().uuid()).min(1).max(50).required(),
  updateData: Joi.object().when('operation', {
    is: 'update',
    then: productUpdateSchema.required(),
    otherwise: Joi.forbidden()
  })
});
