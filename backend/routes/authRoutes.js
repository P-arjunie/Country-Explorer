const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
import { register,
    login,
    getCurrentUser,
    updateFavorites
 } from '../controllers/authCOntroller';

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.post('/favorites', auth, updateFavorites);

module.exports = router;
