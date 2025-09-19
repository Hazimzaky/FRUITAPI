import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getProductStats,
  bulkDeleteProducts
} from '../controllers/productController';
import { validate, productSchema, querySchema, idSchema, productUpdateSchema, bulkOperationSchema } from '../utils/validation';

const router = Router();

/**
 * Product Routes
 * All routes are prefixed with /api/products
 */

/**
 * @route   POST /api/products
 * @desc    create a new product
 * @access  Public
 */
router.post('/', validate(productSchema), createProduct);

/**
 * @route   GET /api/products
 * @desc    get all products with filtering, pagination, and sorting
 * @access  public
 * @query   page, limit, sort, order, category, organic, minPrice, maxPrice, search
 */
router.get('/', validate(querySchema, 'query'), getProducts);

/**
 * @route   GET /api/products/stats
 * @desc    get product statistics
 * @access  public
 */
router.get('/stats', getProductStats);

/**
 * @route   GET /api/products/search
 * @desc    search products by name or description
 * @access  public
 * @query   q (search query), page, limit, sort, order, category, organic
 */
router.get('/search', validate(querySchema, 'query'), searchProducts);

/**
 * @route   GET /api/products/category/:category
 * @desc    get products by category
 * @access  Public
 * @params  category - Product category
 * @query   page, limit, sort, order, organic, minPrice, maxPrice
 */
router.get('/category/:category', validate(querySchema, 'query'), getProductsByCategory);

/**
 * @route   GET /api/products/:id
 * @desc    get a single product by ID
 * @access  public
 * @params  id - Product UUID
 */
router.get('/:id', validate(idSchema, 'params'), getProductById);

/**
 * @route   put /api/products/:id
 * @desc    update a product by ID
 * @access  public
 * @params  id - Product UUID
 */
router.put('/:id', validate(idSchema, 'params'), validate(productUpdateSchema), updateProduct);

/**
 * @route   delete /api/products/:id
 * @desc    delete a product by ID
 * @access  public
 * @params  id - Product UUID
 */
router.delete('/:id', validate(idSchema, 'params'), deleteProduct);

/**
 * @route   delete /api/products/bulk
 * @desc    bulk delete products
 * @access  public
 * @body    { ids: string[] }
 */
router.delete('/bulk', validate(bulkOperationSchema), bulkDeleteProducts);

export default router;
