// controllers/userController.js
const userService = require('../services/userService.js');
const jwt = require('jsonwebtoken');
// Create a new user
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const updatedUser = await userService.updateUser(userId, updatedData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await userService.deleteUser(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get current user profile from token
const getProfile = async (req, res) => {
    // console.log(req.headers.authorization)
    try {
        const token = req.headers.authorization; // Get token from Authorization header (Bearer token)
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }
        console.log(process.env.JWT_SECRET)
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to use your JWT_SECRET
        const userId = decoded.id; // Decode user ID from the token

        // Fetch the user by ID
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Return the user's profile
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    getProfile
};
