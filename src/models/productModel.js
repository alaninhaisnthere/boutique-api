const pool = require('../config/database');

async function getAllProducts() {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM produtos');
        return rows;
    } finally {
        connection.release();
    }
}

async function getProductById(productId) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [productId]);
        return rows[0];
    } finally {
        connection.release();
    }
}

module.exports = {
    getAllProducts,
    getProductById
};
