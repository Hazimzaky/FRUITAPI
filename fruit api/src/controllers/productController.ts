import { Request, Response } from 'express';
import Product from '../models/Product';
import { ProductFilters, IProduct } from '../types';
import { createError, asyncHandler } from '../middleware/errorHandler';

/**
 *الجزء الكنترولر بتاع المنتج 
 * يعمل الكنترول على كل العمليات المتعلقة بالمنتج
 */

/**
 * جزء بتاع انشاء  المنتج
 * POST /api/products
 */
export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const productData: Partial<IProduct> = req.body;

  // جزء بتاع التحقق من وجود منتج بنفس الاسم
  const existingProduct = await Product.findOne({
    $or: [
      { 'name.en': productData.name?.en },
      { 'name.ar': productData.name?.ar }
    ]
  });

  if (existingProduct) {
    throw createError.duplicate('Product with this name already exists');
  }

  const product = new Product(productData);
  await product.save();

  res.created(product, 'Product created successfully');
});

/**
 * جزء بتاع الحصول على كل المنتجات بتاعت الفلترة, الترقيم, و الترتيب
 * GET /api/products
 */
export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const filters: ProductFilters = req.query;
  
  // جزء بتاع استخراج البارامترات المختلفة للترقيم
  const page = parseInt(filters.page?.toString() || '1');
  const limit = parseInt(filters.limit?.toString() || '10');
  const skip = (page - 1) * limit;

  // جزء بتاع البناء على الاستعلام
  const query: any = {};
  
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

  // جزء بتاع البناء على الترتيب
  const sortField = filters.sort || 'createdAt';
  const sortOrder = filters.order === 'asc' ? 1 : -1;
  const sort: any = {};
  sort[sortField] = sortOrder;

  // جزء بتاع التنفيذ على الاستعلام مع الترقيم
  const [products, totalItems] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query)
  ]);

  // جزء بتاع الحساب على الترقيم
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

/**
 * جزء بتاع الحصول على منتج واحد بال ال id
 * GET /api/products/:id
 */
export const getProductById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const product = await Product.findOne({ id }).lean();

  if (!product) {
    throw createError.notFound('Product');
  }

  res.success(product, 'Product retrieved successfully');
});

/**
 * تحديث منتج عن طريق ال ID
 * PUT /api/products/:id
 */
export const updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData: Partial<IProduct> = req.body;

  // جزء بتاع التحقق من وجود المنتج
  const existingProduct = await Product.findOne({ id });
  if (!existingProduct) {
    throw createError.notFound('Product');
  }

  // جزء بتاع التحقق من وجود منتج بنفس الاسم
  if (updateData.name) {
    const duplicateProduct = await Product.findOne({
      _id: { $ne: existingProduct._id },
      $or: [
        { 'name.en': updateData.name.en },
        { 'name.ar': updateData.name.ar }
      ]
    });

    if (duplicateProduct) {
      throw createError.duplicate('Product with this name already exists');
    }
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { id },
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  res.updated(updatedProduct, 'Product updated successfully');
});

/**
 * جزء بتاع حذف منتج عن طريق ال ID
 * DELETE /api/products/:id
 */
export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ id });

  if (!product) {
    throw createError.notFound('Product');
  }

  res.deleted('Product deleted successfully');
});

/**
 * جزء بتاع الحصول على منتجات بال الفئة
 * GET /api/products/category/:category
 */
export const getProductsByCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;
  const filters: ProductFilters = req.query;
  
  const page = parseInt(filters.page?.toString() || '1');
  const limit = parseInt(filters.limit?.toString() || '10');
  const skip = (page - 1) * limit;

  const query: any = { category };
  
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
  const sort: any = {};
  sort[sortField] = sortOrder;

  const [products, totalItems] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query)
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

/**
 * جزء بتاع البحث على المنتجات بناء على الاسم او الوصف
 * GET /api/products/search
 */
export const searchProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { q: searchQuery } = req.query;
  const filters: ProductFilters = req.query;
  
  if (!searchQuery) {
    throw createError.badRequest('Search query is required');
  }

  const page = parseInt(filters.page?.toString() || '1');
  const limit = parseInt(filters.limit?.toString() || '10');
  const skip = (page - 1) * limit;

  const query: any = {
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
  const sort: any = {};
  sort[sortField] = sortOrder;

  const [products, totalItems] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(query)
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

/**
 * جزء بتاع الحصول على احصائيات المنتجات
 * GET /api/products/stats
 */
export const getProductStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const stats = await Product.aggregate([
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

  const categoryStats = await Product.aggregate([
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

/**
 * حذف المنتجات مرة واحدة
 * DELETE /api/products/bulk
 */
export const bulkDeleteProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    throw createError.badRequest('Product IDs array is required');
  }

  const result = await Product.deleteMany({ id: { $in: ids } });

  res.success(
    { deletedCount: result.deletedCount },
    `${result.deletedCount} products deleted successfully`
  );
});
