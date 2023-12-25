const mysql = require('mysql2/promise');

function createConnectionPool() {
    return mysql.createPool({
        host: 'localhost',
        port: 3306,
        database: 'dilboutique',
        user: 'root',
        password: ''
    });
}

module.exports = createConnectionPool;
