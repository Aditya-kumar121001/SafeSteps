const express = require('express');
const router = express.Router();
const {loginUser} = require('../controllers/authController');

// Route for user authentication
router.post('/auth/login', loginUser);

module.exports = router;
