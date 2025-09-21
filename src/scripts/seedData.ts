import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from '../config/config';
import Product from '../models/Product';
import { IProduct } from '../types';

// Load environment variables
dotenv.config();

/**
 * Database Seeder
 * Seeds the database with sample fruit and vegetable products
 */

// Sample product data
const sampleProducts: Partial<IProduct>[] = [
  // Fruits
  {
    name: { en: 'Red Apple', ar: 'تفاح أحمر' },
    category: 'Fruits',
    price: { value: 2.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&fm=jpg'],
    description: 'Fresh, crisp red apples perfect for snacking or baking. Rich in fiber and vitamin C.',
    attributes: {
      organic: true,
      shelf_life: '2-3 weeks',
      calories: { value: 52, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.5,
      count: 128,
      detailed: { average: 4.5, total_reviews: 128 }
    }
  },
  {
    name: { en: 'Banana', ar: 'موز' },
    category: 'Fruits',
    price: { value: 1.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&fm=jpg'],
    description: 'Sweet, yellow bananas rich in potassium and vitamin B6. Perfect for smoothies and snacks.',
    attributes: {
      organic: false,
      shelf_life: '5-7 days',
      calories: { value: 89, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 95,
      detailed: { average: 4.3, total_reviews: 95 }
    }
  },
  {
    name: { en: 'Orange', ar: 'برتقال' },
    category: 'Fruits',
    price: { value: 3.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Juicy, vitamin C-rich oranges perfect for fresh juice or eating fresh.',
    attributes: {
      organic: true,
      shelf_life: '1-2 weeks',
      calories: { value: 47, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 87,
      detailed: { average: 4.4, total_reviews: 87 }
    }
  },
  {
    name: { en: 'Watermelon', ar: 'بطيخ' },
    category: 'Fruits',
    price: { value: 4.99, currency: 'USD', unit: 'piece' },
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&fm=jpg'],
    description: 'Large, sweet watermelon perfect for summer refreshment. High in water content and antioxidants.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 30, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.6,
      count: 156,
      detailed: { average: 4.6, total_reviews: 156 }
    }
  },
  {
    name: { en: 'Strawberry', ar: 'فراولة' },
    category: 'Fruits',
    price: { value: 5.99, currency: 'USD', unit: 'box' },
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&fm=jpg'],
    description: 'Sweet, red strawberries perfect for desserts, smoothies, or eating fresh.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 32, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.7,
      count: 203,
      detailed: { average: 4.7, total_reviews: 203 }
    }
  },
  {
    name: { en: 'Grapes', ar: 'عنب' },
    category: 'Fruits',
    price: { value: 4.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1631299106224-aae61c217164?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Sweet, seedless grapes perfect for snacking or making wine.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 62, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 74,
      detailed: { average: 4.2, total_reviews: 74 }
    }
  },
  {
    name: { en: 'Mango', ar: 'مانجو' },
    category: 'Fruits',
    price: { value: 6.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Tropical mango with sweet, juicy flesh. Perfect for smoothies, desserts, or eating fresh.',
    attributes: {
      organic: true,
      shelf_life: '5-7 days',
      calories: { value: 60, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.8,
      count: 142,
      detailed: { average: 4.8, total_reviews: 142 }
    }
  },
  {
    name: { en: 'Pineapple', ar: 'أناناس' },
    category: 'Fruits',
    price: { value: 3.99, currency: 'USD', unit: 'piece' },
    images: ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&fm=jpg'],
    description: 'Sweet, tropical pineapple perfect for fruit salads, smoothies, or grilling.',
    attributes: {
      organic: false,
      shelf_life: '3-5 days',
      calories: { value: 50, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 89,
      detailed: { average: 4.3, total_reviews: 89 }
    }
  },
  {
    name: { en: 'Kiwi', ar: 'كيوي' },
    category: 'Fruits',
    price: { value: 7.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1674382739482-5d36b98d653a?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Tart, green kiwi fruit rich in vitamin C and fiber. Perfect for fruit salads.',
    attributes: {
      organic: true,
      shelf_life: '1-2 weeks',
      calories: { value: 61, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 67,
      detailed: { average: 4.1, total_reviews: 67 }
    }
  },
  {
    name: { en: 'Blueberry', ar: 'توت أزرق' },
    category: 'Fruits',
    price: { value: 8.99, currency: 'USD', unit: 'box' },
    images: ['https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&fm=jpg'],
    description: 'Antioxidant-rich blueberries perfect for smoothies, baking, or eating fresh.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 57, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.6,
      count: 134,
      detailed: { average: 4.6, total_reviews: 134 }
    }
  },

  // Vegetables
  {
    name: { en: 'Carrot', ar: 'جزر' },
    category: 'Vegetables',
    price: { value: 2.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
    description: 'Fresh, crunchy carrots rich in beta-carotene and vitamin A. Perfect for salads and cooking.',
    attributes: {
      organic: true,
      shelf_life: '2-3 weeks',
      calories: { value: 41, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 98,
      detailed: { average: 4.4, total_reviews: 98 }
    }
  },
  {
    name: { en: 'Tomato', ar: 'طماطم' },
    category: 'Vegetables',
    price: { value: 3.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&fm=jpg'],
    description: 'Juicy, red tomatoes perfect for salads, sauces, and cooking. Rich in lycopene.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 18, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 112,
      detailed: { average: 4.2, total_reviews: 112 }
    }
  },
  {
    name: { en: 'Cucumber', ar: 'خيار' },
    category: 'Vegetables',
    price: { value: 1.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&fm=jpg'],
    description: 'Fresh, crisp cucumbers perfect for salads and pickling. High in water content.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 16, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.0,
      count: 76,
      detailed: { average: 4.0, total_reviews: 76 }
    }
  },
  {
    name: { en: 'Lettuce', ar: 'خس' },
    category: 'Vegetables',
    price: { value: 2.99, currency: 'USD', unit: 'bunch' },
    images: ['https://plus.unsplash.com/premium_photo-1678198891468-17f08ad39c29?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh, green lettuce perfect for salads and sandwiches. Rich in folate and vitamin K.',
    attributes: {
      organic: true,
      shelf_life: '5-7 days',
      calories: { value: 15, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 83,
      detailed: { average: 4.1, total_reviews: 83 }
    }
  },
  {
    name: { en: 'Broccoli', ar: 'بروكلي' },
    category: 'Vegetables',
    price: { value: 4.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1583663848850-46af132dc08e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Nutritious broccoli rich in vitamin C, K, and fiber. Perfect for steaming or stir-frying.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 34, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 91,
      detailed: { average: 4.3, total_reviews: 91 }
    }
  },
  {
    name: { en: 'Spinach', ar: 'سبانخ' },
    category: 'Vegetables',
    price: { value: 3.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Dark, leafy spinach rich in iron, folate, and vitamin K. Perfect for salads and cooking.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 23, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.5,
      count: 105,
      detailed: { average: 4.5, total_reviews: 105 }
    }
  },
  {
    name: { en: 'Bell Pepper', ar: 'فلفل حلو' },
    category: 'Vegetables',
    price: { value: 5.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&fm=jpg'],
    description: 'Colorful bell peppers perfect for stir-fries, salads, and stuffing. Rich in vitamin C.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 31, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 78,
      detailed: { average: 4.2, total_reviews: 78 }
    }
  },
  {
    name: { en: 'Onion', ar: 'بصل' },
    category: 'Vegetables',
    price: { value: 1.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=500&fm=jpg'],
    description: 'Essential cooking onion perfect for soups, stews, and sautés. Rich in antioxidants.',
    attributes: {
      organic: false,
      shelf_life: '2-3 months',
      calories: { value: 40, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.0,
      count: 65,
      detailed: { average: 4.0, total_reviews: 65 }
    }
  },
  {
    name: { en: 'Potato', ar: 'بطاطس' },
    category: 'Vegetables',
    price: { value: 2.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&fm=jpg'],
    description: 'Versatile potatoes perfect for baking, frying, or boiling. Rich in potassium and vitamin C.',
    attributes: {
      organic: false,
      shelf_life: '2-3 weeks',
      calories: { value: 77, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 89,
      detailed: { average: 4.1, total_reviews: 89 }
    }
  },
  {
    name: { en: 'Cauliflower', ar: 'قرنبيط' },
    category: 'Vegetables',
    price: { value: 3.99, currency: 'USD', unit: 'piece' },
    images: ['https://images.unsplash.com/photo-1613743990305-736d763f3d70?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Nutritious cauliflower perfect for roasting, steaming, or making rice. Rich in vitamin C.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 25, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 72,
      detailed: { average: 4.3, total_reviews: 72 }
    }
  },

  // Herbs
  {
    name: { en: 'Basil', ar: 'ريحان' },
    category: 'Herbs',
    price: { value: 2.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1500420254515-0faefa2dac99?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh basil leaves perfect for pesto, salads, and Italian dishes. Aromatic and flavorful.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 22, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 56,
      detailed: { average: 4.4, total_reviews: 56 }
    }
  },
  {
    name: { en: 'Cilantro', ar: 'كزبرة' },
    category: 'Herbs',
    price: { value: 1.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1723810315251-eeca9b7ee1a8?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh cilantro perfect for Mexican, Asian, and Middle Eastern dishes. Bright and citrusy.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 23, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 48,
      detailed: { average: 4.2, total_reviews: 48 }
    }
  },
  {
    name: { en: 'Parsley', ar: 'بقدونس' },
    category: 'Herbs',
    price: { value: 1.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1721117090894-029c81cf0758?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh parsley perfect for garnishing and adding flavor to dishes. Rich in vitamin K.',
    attributes: {
      organic: true,
      shelf_life: '5-7 days',
      calories: { value: 36, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.0,
      count: 41,
      detailed: { average: 4.0, total_reviews: 41 }
    }
  },
  {
    name: { en: 'Mint', ar: 'نعناع' },
    category: 'Herbs',
    price: { value: 2.49, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1603653856395-084002e5d39d?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh mint leaves perfect for teas, cocktails, and Middle Eastern dishes. Refreshing and aromatic.',
    attributes: {
      organic: true,
      shelf_life: '5-7 days',
      calories: { value: 70, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 52,
      detailed: { average: 4.3, total_reviews: 52 }
    }
  },
  {
    name: { en: 'Rosemary', ar: 'إكليل الجبل' },
    category: 'Herbs',
    price: { value: 3.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1614110142810-9953acd736dd?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Aromatic rosemary perfect for roasting meats and vegetables. Woody and fragrant.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 131, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.5,
      count: 38,
      detailed: { average: 4.5, total_reviews: 38 }
    }
  },

  // Nuts
  {
    name: { en: 'Almonds', ar: 'لوز' },
    category: 'Nuts',
    price: { value: 12.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Premium almonds rich in protein, healthy fats, and vitamin E. Perfect for snacking or baking.',
    attributes: {
      organic: true,
      shelf_life: '6 months',
      calories: { value: 579, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.6,
      count: 124,
      detailed: { average: 4.6, total_reviews: 124 }
    }
  },
  {
    name: { en: 'Walnuts', ar: 'جوز' },
    category: 'Nuts',
    price: { value: 15.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1733337336594-61f20d18ac2a?q=80&w=817&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Rich walnuts high in omega-3 fatty acids and antioxidants. Perfect for salads and baking.',
    attributes: {
      organic: true,
      shelf_life: '6 months',
      calories: { value: 654, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 89,
      detailed: { average: 4.4, total_reviews: 89 }
    }
  },
  {
    name: { en: 'Cashews', ar: 'كاجو' },
    category: 'Nuts',
    price: { value: 18.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Creamy cashews rich in magnesium and healthy fats. Perfect for snacking or making nut butter.',
    attributes: {
      organic: false,
      shelf_life: '6 months',
      calories: { value: 553, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.5,
      count: 97,
      detailed: { average: 4.5, total_reviews: 97 }
    }
  },
  {
    name: { en: 'Pistachios', ar: 'فستق' },
    category: 'Nuts',
    price: { value: 22.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1502825751399-28baa9b81efe?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Premium pistachios rich in protein and healthy fats. Perfect for snacking or desserts.',
    attributes: {
      organic: true,
      shelf_life: '6 months',
      calories: { value: 560, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.7,
      count: 113,
      detailed: { average: 4.7, total_reviews: 113 }
    }
  },
  {
    name: { en: 'Pecans', ar: 'جوز البقان' },
    category: 'Nuts',
    price: { value: 19.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1675237626453-06a961faedaf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Rich pecans perfect for baking and snacking. High in healthy fats and antioxidants.',
    attributes: {
      organic: true,
      shelf_life: '6 months',
      calories: { value: 691, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 67,
      detailed: { average: 4.3, total_reviews: 67 }
    }
  },

  // Grains
  {
    name: { en: 'Brown Rice', ar: 'أرز بني' },
    category: 'Grains',
    price: { value: 4.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&fm=jpg'],
    description: 'Nutritious brown rice rich in fiber and B vitamins. Perfect for healthy meals.',
    attributes: {
      organic: true,
      shelf_life: '1 year',
      calories: { value: 111, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 78,
      detailed: { average: 4.2, total_reviews: 78 }
    }
  },
  {
    name: { en: 'Quinoa', ar: 'كينوا' },
    category: 'Grains',
    price: { value: 8.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1586201375799-47cd24c3f595?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Superfood quinoa rich in complete protein and fiber. Perfect for salads and bowls.',
    attributes: {
      organic: true,
      shelf_life: '2 years',
      calories: { value: 120, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.6,
      count: 95,
      detailed: { average: 4.6, total_reviews: 95 }
    }
  },
  {
    name: { en: 'Oats', ar: 'شوفان' },
    category: 'Grains',
    price: { value: 3.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1671130295244-b058fc8d86fe?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Rolled oats perfect for breakfast porridge and baking. Rich in fiber and protein.',
    attributes: {
      organic: true,
      shelf_life: '1 year',
      calories: { value: 389, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 86,
      detailed: { average: 4.4, total_reviews: 86 }
    }
  },
  {
    name: { en: 'Barley', ar: 'شعير' },
    category: 'Grains',
    price: { value: 5.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1705404738459-c4cb25ad7933?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Nutritious barley perfect for soups and stews. Rich in fiber and minerals.',
    attributes: {
      organic: false,
      shelf_life: '1 year',
      calories: { value: 352, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 54,
      detailed: { average: 4.1, total_reviews: 54 }
    }
  },
  {
    name: { en: 'Buckwheat', ar: 'حنطة سوداء' },
    category: 'Grains',
    price: { value: 7.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1613758235306-69cc0a3f614d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Gluten-free buckwheat rich in protein and antioxidants. Perfect for pancakes and porridge.',
    attributes: {
      organic: true,
      shelf_life: '1 year',
      calories: { value: 343, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 61,
      detailed: { average: 4.3, total_reviews: 61 }
    }
  },

  // Additional fruits for variety
  {
    name: { en: 'Peach', ar: 'خوخ' },
    category: 'Fruits',
    price: { value: 4.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1664551734324-b358c6d7bb63?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Sweet, juicy peaches perfect for desserts and eating fresh. Rich in vitamin C.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 39, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.4,
      count: 73,
      detailed: { average: 4.4, total_reviews: 73 }
    }
  },
  {
    name: { en: 'Pear', ar: 'إجاص' },
    category: 'Fruits',
    price: { value: 3.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1696426506268-00a41b06b956?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Sweet, crisp pears perfect for snacking or baking. Rich in fiber and vitamin C.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 57, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 58,
      detailed: { average: 4.2, total_reviews: 58 }
    }
  },
  {
    name: { en: 'Cherry', ar: 'كرز' },
    category: 'Fruits',
    price: { value: 9.99, currency: 'USD', unit: 'kg' },
    images: ['https://plus.unsplash.com/premium_photo-1688671923138-ff74e0f9a810?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Sweet, red cherries perfect for desserts and snacking. Rich in antioxidants.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 63, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.7,
      count: 91,
      detailed: { average: 4.7, total_reviews: 91 }
    }
  },
  {
    name: { en: 'Lemon', ar: 'ليمون' },
    category: 'Fruits',
    price: { value: 2.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh lemons perfect for cooking, baking, and beverages. Rich in vitamin C.',
    attributes: {
      organic: true,
      shelf_life: '2 weeks',
      calories: { value: 29, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 64,
      detailed: { average: 4.3, total_reviews: 64 }
    }
  },
  {
    name: { en: 'Lime', ar: 'ليمون حامض' },
    category: 'Fruits',
    price: { value: 3.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1578855691621-8a08ea00d1fb?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh limes perfect for cocktails, cooking, and beverages. Rich in vitamin C.',
    attributes: {
      organic: false,
      shelf_life: '2 weeks',
      calories: { value: 30, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 47,
      detailed: { average: 4.1, total_reviews: 47 }
    }
  },

  // Additional vegetables for variety
  {
    name: { en: 'Zucchini', ar: 'كوسة' },
    category: 'Vegetables',
    price: { value: 3.99, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1692956475726-d4a90d0dfbdf?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh zucchini perfect for grilling, sautéing, or spiralizing. Low in calories.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 17, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.2,
      count: 69,
      detailed: { average: 4.2, total_reviews: 69 }
    }
  },
  {
    name: { en: 'Eggplant', ar: 'باذنجان' },
    category: 'Vegetables',
    price: { value: 4.49, currency: 'USD', unit: 'kg' },
    images: ['https://images.unsplash.com/photo-1639428134238-b548770d4b77?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Purple eggplant perfect for grilling, roasting, or making baba ganoush. Rich in antioxidants.',
    attributes: {
      organic: false,
      shelf_life: '1 week',
      calories: { value: 25, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.0,
      count: 55,
      detailed: { average: 4.0, total_reviews: 55 }
    }
  },
  {
    name: { en: 'Cabbage', ar: 'ملفوف' },
    category: 'Vegetables',
    price: { value: 2.99, currency: 'USD', unit: 'piece' },
    images: ['https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh cabbage perfect for coleslaw, stir-fries, and fermenting. Rich in vitamin C.',
    attributes: {
      organic: true,
      shelf_life: '2 weeks',
      calories: { value: 25, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.1,
      count: 62,
      detailed: { average: 4.1, total_reviews: 62 }
    }
  },
  {
    name: { en: 'Radish', ar: 'فجل' },
    category: 'Vegetables',
    price: { value: 2.49, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1589753014594-0676c69bbcbe?q=80&w=740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Crisp radishes perfect for salads and pickling. Spicy and refreshing.',
    attributes: {
      organic: true,
      shelf_life: '1 week',
      calories: { value: 16, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.3,
      count: 48,
      detailed: { average: 4.3, total_reviews: 48 }
    }
  },
  {
    name: { en: 'Asparagus', ar: 'هليون' },
    category: 'Vegetables',
    price: { value: 6.99, currency: 'USD', unit: 'bunch' },
    images: ['https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: 'Fresh asparagus perfect for grilling, roasting, or steaming. Rich in folate and vitamin K.',
    attributes: {
      organic: true,
      shelf_life: '3-5 days',
      calories: { value: 20, unit: 'kcal', per: '100g' }
    },
    reviews: {
      average_rating: 4.5,
      count: 71,
      detailed: { average: 4.5, total_reviews: 71 }
    }
  }
];

/**
 * Connect to database
 */
async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.database.mongodbUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

/**
 * Clear existing products
 */
async function clearProducts(): Promise<void> {
  try {
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
  } catch (error) {
    console.error('❌ Failed to clear products:', error);
    throw error;
  }
}

/**
 * Seed products
 */
async function seedProducts(): Promise<void> {
  try {
    const products = await Product.insertMany(sampleProducts);
    console.log(`🌱 Seeded ${products.length} products successfully`);
  } catch (error) {
    console.error('❌ Failed to seed products:', error);
    throw error;
  }
}

/**
 * Main seeder function
 */
async function seedDatabase(): Promise<void> {
  try {
    console.log('🚀 Starting database seeding...');
    
    await connectToDatabase();
    await clearProducts();
    await seedProducts();
    
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase, sampleProducts };
