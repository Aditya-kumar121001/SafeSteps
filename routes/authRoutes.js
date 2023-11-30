const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user authentication
router.post('/auth/login', authController.loginUser);

module.exports = router;
