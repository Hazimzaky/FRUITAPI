const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Response helper
app.use((req, res, next) => {
  res.success = (data, message = 'Success') => {
    res.json({ success: true, data, message });
  };
  res.error = (message = 'Error', statusCode = 400) => {
    res.status(statusCode).json({
      success: false,
      message,
      error: {
        type: 'ERROR',
        code: statusCode,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method
      }
    });
  };
  next();
});

// Database connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
    });

    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains'],
    required: true
  },
  price: {
    value: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    unit: { type: String, default: 'kg' }
  },
  images: [String],
  description: { type: String, required: true },
  attributes: {
    organic: { type: Boolean, default: false },
    shelf_life: { type: String, required: true },
    calories: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'kcal' },
      per: { type: String, default: '100g' }
    }
  },
  reviews: {
    average_rating: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/', (req, res) => {
  res.success({
    name: 'Fruit & Vegetable E-commerce API',
    version: '1.0.0',
    description: 'RESTful API for managing fruits and vegetables',
    endpoints: {
      products: '/api/products',
      health: '/api/health'
    }
  }, 'Welcome to Fruit & Vegetable E-commerce API');
});

app.get('/api/health', (req, res) => {
  res.success({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production'
  }, 'API is running');
});

app.get('/api/products', async (req, res) => {
  try {
    await connectDB();
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments();
    
    res.success({
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    }, 'Products retrieved successfully');
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.error('Failed to fetch products', 500);
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    await connectDB();
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.error('Product not found', 404);
    }
    
    res.success({ data: product }, 'Product retrieved successfully');
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.error('Failed to fetch product', 500);
  }
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: {
      type: 'INTERNAL_SERVER_ERROR',
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: {
      type: 'NOT_FOUND',
      code: 404,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  });
});

module.exports = app;