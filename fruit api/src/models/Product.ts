import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from '../types';

/**
 * الاسكيما بتاعت مونجو db لو هتشتغل لوكال
 * من هنا هوا شغال على اكتر من لغة 
 */
const ProductSchema = new Schema<IProduct & Document>({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => {
      const { v4 } = require('uuid');
      return v4();
    }
  },
  name: {
    en: {
      type: String,
      required: [true, 'English name is required'],
      trim: true,
      maxlength: [100, 'English name cannot exceed 100 characters']
    },
    ar: {
      type: String,
      required: [true, 'Arabic name is required'],
      trim: true,
      maxlength: [100, 'Arabic name cannot exceed 100 characters']
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Fruits', 'Vegetables', 'Herbs', 'Nuts', 'Grains'],
      message: 'Category must be one of: Fruits, Vegetables, Herbs, Nuts, Grains'
    },
    index: true
  },
  price: {
    value: {
      type: Number,
      required: [true, 'Price value is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'SAR', 'AED']
    },
    unit: {
      type: String,
      required: [true, 'Price unit is required'],
      enum: ['kg', 'lb', 'piece', 'bunch', 'bag', 'box'],
      default: 'kg'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL ending with jpg, jpeg, png, or webp'
    }
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  attributes: {
    organic: {
      type: Boolean,
      default: false,
      index: true
    },
    shelf_life: {
      type: String,
      required: [true, 'Shelf life is required'],
      trim: true
    },
    calories: {
      value: {
        type: Number,
        required: [true, 'Calorie value is required'],
        min: [0, 'Calories cannot be negative']
      },
      unit: {
        type: String,
        required: [true, 'Calorie unit is required'],
        enum: ['kcal', 'cal'],
        default: 'kcal'
      },
      per: {
        type: String,
        required: [true, 'Calorie per unit is required'],
        enum: ['100g', '1kg', '1 piece', '1 cup'],
        default: '100g'
      }
    }
  },
  reviews: {
    average_rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative']
    },
    detailed: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Average rating cannot be less than 0'],
        max: [5, 'Average rating cannot be more than 5']
      },
      total_reviews: {
        type: Number,
        default: 0,
        min: [0, 'Total reviews cannot be negative']
      }
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes عشان الكويري تشتغل احسن و تعلي الريسبونس
ProductSchema.index({ category: 1, 'attributes.organic': 1 });
ProductSchema.index({ 'price.value': 1 });
ProductSchema.index({ 'reviews.average_rating': -1 });
ProductSchema.index({ 'name.en': 'text', 'name.ar': 'text', description: 'text' });

// دا جزء بري سيف عشان تخزين الريفيوز 
ProductSchema.pre('save', function(next: any) {
  if (this.reviews.detailed.total_reviews > 0) {
    this.reviews.average_rating = this.reviews.detailed.average;
    this.reviews.count = this.reviews.detailed.total_reviews;
  }
  next();
});

// جزء الفلترة في المنتجات 
ProductSchema.statics.findWithFilters = function(filters: any) {
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
  
  return query;
};

export default mongoose.model<IProduct & Document>('Product', ProductSchema);
