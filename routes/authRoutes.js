// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import the controller functions
const { register, login } = require('../controllers/authController');

// Define the routes
router.post('/register', register); // Ensure registerUser is imported and defined
router.post('/login', login);       // Ensure loginUser is imported and defined

module.exports = router;
