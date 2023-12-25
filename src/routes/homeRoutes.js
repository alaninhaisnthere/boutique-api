const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

router.get('/', async (req, res) => {
    try {
        const products = await productModel.getAllProducts();

        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
