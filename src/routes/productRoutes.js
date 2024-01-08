const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/products/category/:category', productController.getProductsByCategory);
router.post('/products/upload-image', productController.uploadProductImage);

module.exports = router;
