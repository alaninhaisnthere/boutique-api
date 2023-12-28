const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
router.put('/edit/:userId', userController.editUser);

module.exports = router;
