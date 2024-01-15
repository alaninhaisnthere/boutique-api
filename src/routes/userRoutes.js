const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post("/register", userController.registerUser);
router.put("/edit/:userId", userController.editUser);
router.post("/login", userController.loginUser);

module.exports = router;