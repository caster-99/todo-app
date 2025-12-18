// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user
const createUser = async (userData) => {
    try {
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await User.create({
            ...userData,
            password: hashedPassword,  // Save the hashed password
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Get a user by ID
const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

// Update a user by ID
const updateUser = async (userId, updatedData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Hash the new password if it's being updated
        if (updatedData.password) {
            const hashedPassword = await bcrypt.hash(updatedData.password, 10);
            updatedData.password = hashedPassword;
        }

        await user.update(updatedData);
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Delete a user by ID
const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};


const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        //  console.log(JWT_SECRET)
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return {
            user: { id: user.id, email: user.email, name: user.name },
            token
        };
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};
