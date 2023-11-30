const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for getting user by ID
router.get('/users/:userId', userController.getUserById);
// Route for creating a new user
router.post('/users', userController.createUser);

module.exports = router;
