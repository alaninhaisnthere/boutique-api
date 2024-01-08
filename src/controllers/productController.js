const productModel = require('../models/productModel');

async function getAllProducts(req, res) {
    try {
        res.json({ message: 'Products retrieved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductById(req, res) {
    try {
        const productInfo = await productModel.getProductById(req.params.productId);

        if (!productInfo) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(productInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductsByCategory(req, res) {
    try {
        const category = req.params.category;
        res.json({ message: `Products in category ${category} retrieved successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadProductImage(req, res) {
    try {
        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;

        const uploadResult = await productModel.uploadImageToS3(fileBuffer, fileName);

        res.json({ imageUrl: uploadResult.Location });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    uploadProductImage,
};
