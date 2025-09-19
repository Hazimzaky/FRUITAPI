"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.post('/', (0, validation_1.validate)(validation_1.productSchema), productController_1.createProduct);
router.get('/', (0, validation_1.validate)(validation_1.querySchema, 'query'), productController_1.getProducts);
router.get('/stats', productController_1.getProductStats);
router.get('/search', (0, validation_1.validate)(validation_1.querySchema, 'query'), productController_1.searchProducts);
router.get('/category/:category', (0, validation_1.validate)(validation_1.querySchema, 'query'), productController_1.getProductsByCategory);
router.get('/:id', (0, validation_1.validate)(validation_1.idSchema, 'params'), productController_1.getProductById);
router.put('/:id', (0, validation_1.validate)(validation_1.idSchema, 'params'), (0, validation_1.validate)(validation_1.productUpdateSchema), productController_1.updateProduct);
router.delete('/:id', (0, validation_1.validate)(validation_1.idSchema, 'params'), productController_1.deleteProduct);
router.delete('/bulk', (0, validation_1.validate)(validation_1.bulkOperationSchema), productController_1.bulkDeleteProducts);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map