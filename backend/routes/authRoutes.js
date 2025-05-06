const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { register, login, getCurrentUser, updateFavorites } = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.post('/favorites', auth, updateFavorites);

module.exports = router;
