const pool = require('../config/database');

async function getAllProducts() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT id, name, category FROM products');
        return rows;
    } finally {
        connection.release();
    }
}

async function getProductById(productId) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT id, name, category FROM products WHERE id = ?', [productId]);
        return rows[0];
    } finally {
        connection.release();
    }
}

async function getProductsByCategory(category) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT id, name, category FROM products WHERE category = ?', [category]);
        return rows;
    } finally {
        connection.release();
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory
};
