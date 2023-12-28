const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/products/category/:category', productController.getProductsByCategory);

module.exports = router;
