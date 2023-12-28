const pool = require('../config/database');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    console.log('Request Body:', req.body);

    if (!username || !email || !password) {
        console.log('Invalid request parameters');
        return res.status(400).json({ error: "Username, email, and password are required" });
    }

    console.log(pool);

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        console.log('User registered successfully:', result.insertId);
        res.json({ userId: result.insertId, message: "User registered successfully" });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        connection.release();
    }
}

async function getAllUsers(req, res) {
    const connection = await pool.getConnection();

    try {
        const [users] = await connection.query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        connection.release();
    }
}

async function editUser(req, res) {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const connection = await pool.getConnection();

    try {
        const [existingUser] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        await connection.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, userId]);

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        connection.release();
    }
}




module.exports = {
    registerUser,
    getAllUsers,
    editUser
};
