const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            favorites: []
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Error creating user',
            error: error.message 
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Please provide email and password' 
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        //send the token and user data 
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                favorites: user.favorites
            }
        });
        //if the login fails, log the error 
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Error logging in',
            error: error.message 
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        //get the user data using userId except for the password
        const user = await User.findById(req.user.userId)
            .select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        res.json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ 
            message: 'Error fetching user',
            error: error.message 
        });
    }
};

// Update favorites
exports.updateFavorites = async (req, res) => {
    try {
        const { countryCode } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Toggle favorite
        const index = user.favorites.indexOf(countryCode);
        if (index === -1) {
            //if the country is not in the fav, adding it
            user.favorites.push(countryCode);
        } else {
            //if the country is in the fav, removing it
            user.favorites.splice(index, 1);
        }

        await user.save();
        //update the favs
        res.json({
            message: 'Favorites updated successfully',
            favorites: user.favorites
        });

        //if update favs, fails, log the error
    } catch (error) {
        console.error('Update favorites error:', error);
        res.status(500).json({ 
            message: 'Error updating favorites',
            error: error.message 
        });
    }
};