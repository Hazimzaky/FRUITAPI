import { Router } from 'express';
import productRoutes from './productRoutes';

const router = Router();

/**
 * Main API Routes
 * All routes are prefixed with /api
 */

// health check endpoint
router.get('/health', (req, res) => {
  res.success({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  }, 'API is running');
});

// API version info
router.get('/version', (req, res) => {
  res.success({
    version: '1.0.0',
    name: 'Fruit & Vegetable E-commerce API',
    description: 'RESTful API for managing fruits and vegetables',
    endpoints: {
      products: '/api/products',
      health: '/api/health',
      version: '/api/version'
    }
  }, 'API version information');
});

// Product routes
router.use('/products', productRoutes);

export default router;
