"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkOperationSchema = exports.productUpdateSchema = exports.validate = exports.idSchema = exports.querySchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const priceSchema = joi_1.default.object({
    value: joi_1.default.number().positive().required().messages({
        'number.positive': 'Price value must be positive',
        'any.required': 'Price value is required'
    }),
    currency: joi_1.default.string().valid('USD', 'EUR', 'GBP', 'SAR', 'AED').default('USD'),
    unit: joi_1.default.string().valid('kg', 'lb', 'piece', 'bunch', 'bag', 'box').default('kg')
});
const caloriesSchema = joi_1.default.object({
    value: joi_1.default.number().min(0).required().messages({
        'number.min': 'Calories cannot be negative',
        'any.required': 'Calorie value is required'
    }),
    unit: joi_1.default.string().valid('kcal', 'cal').default('kcal'),
    per: joi_1.default.string().valid('100g', '1kg', '1 piece', '1 cup').default('100g')
});
const multiLanguageNameSchema = joi_1.default.object({
    en: joi_1.default.string().trim().min(1).max(100).required().messages({
        'string.min': 'English name cannot be empty',
        'string.max': 'English name cannot exceed 100 characters',
        'any.required': 'English name is required'
    }),
    ar: joi_1.default.string().trim().min(1).max(100).required().messages({
        'string.min': 'Arabic name cannot be empty',
        'string.max': 'Arabic name cannot exceed 100 characters',
        'any.required': 'Arabic name is required'
    })
});
const attributesSchema = joi_1.default.object({
    organic: joi_1.default.boolean().default(false),
    shelf_life: joi_1.default.string().trim().min(1).required().messages({
        'string.min': 'Shelf life cannot be empty',
        'any.required': 'Shelf life is required'
    }),
    calories: caloriesSchema
});
const reviewsSchema = joi_1.default.object({
    average_rating: joi_1.default.number().min(0).max(5).default(0),
    count: joi_1.default.number().min(0).default(0),
    detailed: joi_1.default.object({
        average: joi_1.default.number().min(0).max(5).default(0),
        total_reviews: joi_1.default.number().min(0).default(0)
    }).default({ average: 0, total_reviews: 0 })
});
exports.productSchema = joi_1.default.object({
    name: multiLanguageNameSchema.required(),
    category: joi_1.default.string().valid('Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains').required().messages({
        'any.only': 'Category must be one of: Fruits, Vegetables, Herbs, Nuts, Grains',
        'any.required': 'Category is required'
    }),
    price: priceSchema.required(),
    images: joi_1.default.array().items(joi_1.default.string().uri().pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)).min(1).max(10).messages({
        'array.min': 'At least one image is required',
        'array.max': 'Maximum 10 images allowed',
        'string.pattern.base': 'Image URL must be a valid HTTP/HTTPS URL ending with jpg, jpeg, png, or webp'
    }),
    description: joi_1.default.string().trim().min(10).max(1000).required().messages({
        'string.min': 'Description must be at least 10 characters',
        'string.max': 'Description cannot exceed 1000 characters',
        'any.required': 'Description is required'
    }),
    attributes: attributesSchema.required(),
    reviews: reviewsSchema
});
exports.querySchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(10),
    sort: joi_1.default.string().valid('name', 'price', 'rating', 'createdAt').default('createdAt'),
    order: joi_1.default.string().valid('asc', 'desc').default('desc'),
    category: joi_1.default.string().valid('Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains'),
    organic: joi_1.default.boolean(),
    minPrice: joi_1.default.number().min(0),
    maxPrice: joi_1.default.number().min(0),
    search: joi_1.default.string().trim().max(100)
}).custom((value, helpers) => {
    if (value.minPrice && value.maxPrice && value.minPrice > value.maxPrice) {
        return helpers.error('custom.priceRange');
    }
    return value;
}).messages({
    'custom.priceRange': 'Minimum price cannot be greater than maximum price'
});
exports.idSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required().messages({
        'string.guid': 'Invalid product ID format',
        'any.required': 'Product ID is required'
    })
});
const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errorDetails = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            const response = {
                success: false,
                data: null,
                message: 'Validation failed',
                errors: errorDetails
            };
            res.status(400).json(response);
            return;
        }
        req[property] = value;
        next();
    };
};
exports.validate = validate;
exports.productUpdateSchema = exports.productSchema.fork(['name', 'category', 'price', 'images', 'description', 'attributes', 'reviews'], (schema) => schema.optional());
exports.bulkOperationSchema = joi_1.default.object({
    operation: joi_1.default.string().valid('delete', 'update').required(),
    ids: joi_1.default.array().items(joi_1.default.string().uuid()).min(1).max(50).required(),
    updateData: joi_1.default.object().when('operation', {
        is: 'update',
        then: exports.productUpdateSchema.required(),
        otherwise: joi_1.default.forbidden()
    })
});
//# sourceMappingURL=validation.js.map