// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Existing routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);

// New route for getting the logged-in user's profile
router.get('/profile', userController.getProfile);

module.exports = router;
