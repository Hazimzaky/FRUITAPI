# Fruit & Vegetable E-commerce API

A RESTful API for managing fruits and vegetables in an e-commerce application.

## Features

- 🍎 **Product Management**: CRUD operations for fruits and vegetables
- 🔍 **Search & Filter**: Advanced search and filtering capabilities
- 📊 **Statistics**: Product analytics and insights
- 🌐 **Multi-language**: English and Arabic support
- 🔒 **Security**: Rate limiting, CORS, and input validation
- 📱 **Pagination**: Efficient data pagination

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, filtering, sorting)
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search` - Search products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/stats` - Get product statistics

### System
- `GET /api/health` - Health check
- `GET /api/version` - API version information

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB URI
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:4000`

## Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required)
- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment (development/production)
- `API_PREFIX`: API prefix (default: /api)

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Joi** - Validation
- **Helmet** - Security
- **CORS** - Cross-origin resource sharing
