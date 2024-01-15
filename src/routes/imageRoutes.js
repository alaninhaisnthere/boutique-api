const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/categories', imageController.getAllCategories);
router.get('/products', imageController.getAllImages);
router.get('/images/:categoria/:imagem', imageController.getSignedUrl);

module.exports = router;
