const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/', imageController.getAllImages);
router.get('/categories', imageController.getAllCategories);
router.get('/:categoria', imageController.getCategoryItems);
router.get('/:categoria/:imagem', imageController.getSignedUrlHandler);

module.exports = router;