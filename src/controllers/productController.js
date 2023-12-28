const productModel = require('../models/productModel');

async function getAllProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductById(req, res) {
    try {
        const product = await productModel.getProductById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const productModel = require('../models/productModel');

async function getProductsByCategory(req, res) {
    try {
        const category = req.params.category;
        const products = await productModel.getProductsByCategory(category);

        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found in the specified category' });
        }

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory
};
