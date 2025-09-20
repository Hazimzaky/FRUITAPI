"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleProducts = void 0;
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config/config");
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
const sampleProducts = [
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
        images: ['https://images.unsplash.com/photo-1557800634-7bf3a73b4cbc?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1537640538966-79f369143b8f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1605027990121-47550919c57a?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1622206151226-18ca2c9a4f78?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1438118907707-5f4a9c4e3c30?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1576047478767-88d6c24c0464?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&fm=jpg'],
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
    {
        name: { en: 'Basil', ar: 'ريحان' },
        category: 'Herbs',
        price: { value: 2.99, currency: 'USD', unit: 'bunch' },
        images: ['https://images.unsplash.com/photo-1615485925618-7b1a0b2b5b1a?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1615485925618-7b1a0b2b5b1a?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1615485925618-7b1a0b2b5b1a?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1615485925618-7b1a0b2b5b1a?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1615485925618-7b1a0b2b5b1a?w=500&fm=jpg'],
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
    {
        name: { en: 'Almonds', ar: 'لوز' },
        category: 'Nuts',
        price: { value: 12.99, currency: 'USD', unit: 'kg' },
        images: ['https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&fm=jpg'],
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
    {
        name: { en: 'Peach', ar: 'خوخ' },
        category: 'Fruits',
        price: { value: 4.99, currency: 'USD', unit: 'kg' },
        images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&fm=jpg'],
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
    {
        name: { en: 'Zucchini', ar: 'كوسة' },
        category: 'Vegetables',
        price: { value: 3.99, currency: 'USD', unit: 'kg' },
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
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
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&fm=jpg'],
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
exports.sampleProducts = sampleProducts;
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(config_1.config.database.mongodbUri);
        console.log('✅ Connected to MongoDB');
    }
    catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
async function clearProducts() {
    try {
        await Product_1.default.deleteMany({});
        console.log('🗑️  Cleared existing products');
    }
    catch (error) {
        console.error('❌ Failed to clear products:', error);
        throw error;
    }
}
async function seedProducts() {
    try {
        const products = await Product_1.default.insertMany(sampleProducts);
        console.log(`🌱 Seeded ${products.length} products successfully`);
    }
    catch (error) {
        console.error('❌ Failed to seed products:', error);
        throw error;
    }
}
async function seedDatabase() {
    try {
        console.log('🚀 Starting database seeding...');
        await connectToDatabase();
        await clearProducts();
        await seedProducts();
        console.log('✅ Database seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    seedDatabase();
}
//# sourceMappingURL=seedData.js.map