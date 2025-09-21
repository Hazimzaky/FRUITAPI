"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteProducts = exports.getProductStats = exports.searchProducts = exports.getProductsByCategory = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const errorHandler_1 = require("../middleware/errorHandler");
exports.createProduct = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const productData = req.body;
    const existingProduct = await Product_1.default.findOne({
        $or: [
            { 'name.en': productData.name?.en },
            { 'name.ar': productData.name?.ar }
        ]
    });
    if (existingProduct) {
        throw errorHandler_1.createError.duplicate('Product with this name already exists');
    }
    const product = new Product_1.default(productData);
    await product.save();
    res.created(product, 'Product created successfully');
});
exports.getProducts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const filters = req.query;
    const page = parseInt(filters.page?.toString() || '1');
    const limit = parseInt(filters.limit?.toString() || '10');
    const skip = (page - 1) * limit;
    const query = {};
    if (filters.category) {
        query.category = filters.category;
    }
    if (filters.organic !== undefined) {
        query['attributes.organic'] = filters.organic;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query['price.value'] = {};
        if (filters.minPrice !== undefined) {
            query['price.value'].$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
            query['price.value'].$lte = filters.maxPrice;
        }
    }
    if (filters.search) {
        query.$text = { $search: filters.search };
    }
    const sortField = filters.sort || 'createdAt';
    const sortOrder = filters.order === 'asc' ? 1 : -1;
    const sort = {};
    sort[sortField] = sortOrder;
    const [products, totalItems] = await Promise.all([
        Product_1.default.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Product_1.default.countDocuments(query)
    ]);
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const pagination = {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
    };
    res.paginated(products, pagination, 'Products retrieved successfully');
});
exports.getProductById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findOne({ id }).lean();
    if (!product) {
        throw errorHandler_1.createError.notFound('Product');
    }
    res.success(product, 'Product retrieved successfully');
});
exports.updateProduct = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const existingProduct = await Product_1.default.findOne({ id });
    if (!existingProduct) {
        throw errorHandler_1.createError.notFound('Product');
    }
    if (updateData.name) {
        const duplicateProduct = await Product_1.default.findOne({
            _id: { $ne: existingProduct._id },
            $or: [
                { 'name.en': updateData.name.en },
                { 'name.ar': updateData.name.ar }
            ]
        });
        if (duplicateProduct) {
            throw errorHandler_1.createError.duplicate('Product with this name already exists');
        }
    }
    const updatedProduct = await Product_1.default.findOneAndUpdate({ id }, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true });
    res.updated(updatedProduct, 'Product updated successfully');
});
exports.deleteProduct = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_1.default.findOneAndDelete({ id });
    if (!product) {
        throw errorHandler_1.createError.notFound('Product');
    }
    res.deleted('Product deleted successfully');
});
exports.getProductsByCategory = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { category } = req.params;
    const filters = req.query;
    const page = parseInt(filters.page?.toString() || '1');
    const limit = parseInt(filters.limit?.toString() || '10');
    const skip = (page - 1) * limit;
    const query = { category };
    if (filters.organic !== undefined) {
        query['attributes.organic'] = filters.organic;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query['price.value'] = {};
        if (filters.minPrice !== undefined) {
            query['price.value'].$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
            query['price.value'].$lte = filters.maxPrice;
        }
    }
    const sortField = filters.sort || 'createdAt';
    const sortOrder = filters.order === 'asc' ? 1 : -1;
    const sort = {};
    sort[sortField] = sortOrder;
    const [products, totalItems] = await Promise.all([
        Product_1.default.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Product_1.default.countDocuments(query)
    ]);
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const pagination = {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
    };
    res.paginated(products, pagination, `Products in ${category} category retrieved successfully`);
});
exports.searchProducts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { q: searchQuery } = req.query;
    const filters = req.query;
    if (!searchQuery) {
        throw errorHandler_1.createError.badRequest('Search query is required');
    }
    const page = parseInt(filters.page?.toString() || '1');
    const limit = parseInt(filters.limit?.toString() || '10');
    const skip = (page - 1) * limit;
    const query = {
        $text: { $search: searchQuery.toString() }
    };
    if (filters.category) {
        query.category = filters.category;
    }
    if (filters.organic !== undefined) {
        query['attributes.organic'] = filters.organic;
    }
    const sortField = filters.sort || 'createdAt';
    const sortOrder = filters.order === 'asc' ? 1 : -1;
    const sort = {};
    sort[sortField] = sortOrder;
    const [products, totalItems] = await Promise.all([
        Product_1.default.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Product_1.default.countDocuments(query)
    ]);
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const pagination = {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
    };
    res.paginated(products, pagination, `Search results for "${searchQuery}"`);
});
exports.getProductStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const stats = await Product_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalProducts: { $sum: 1 },
                averagePrice: { $avg: '$price.value' },
                minPrice: { $min: '$price.value' },
                maxPrice: { $max: '$price.value' },
                organicProducts: {
                    $sum: { $cond: [{ $eq: ['$attributes.organic', true] }, 1, 0] }
                },
                averageRating: { $avg: '$reviews.average_rating' }
            }
        }
    ]);
    const categoryStats = await Product_1.default.aggregate([
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 },
                averagePrice: { $avg: '$price.value' }
            }
        },
        { $sort: { count: -1 } }
    ]);
    const response = {
        overview: stats[0] || {
            totalProducts: 0,
            averagePrice: 0,
            minPrice: 0,
            maxPrice: 0,
            organicProducts: 0,
            averageRating: 0
        },
        byCategory: categoryStats
    };
    res.success(response, 'Product statistics retrieved successfully');
});
exports.bulkDeleteProducts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        throw errorHandler_1.createError.badRequest('Product IDs array is required');
    }
    const result = await Product_1.default.deleteMany({ id: { $in: ids } });
    res.success({ deletedCount: result.deletedCount }, `${result.deletedCount} products deleted successfully`);
});
//# sourceMappingURL=productController.js.map