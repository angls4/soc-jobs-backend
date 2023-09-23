const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Route to get the user's profile
route.get('/profile', authMiddleware, userController.getProfile);

// Route to get a user's profile by ID
route.get('/profile/:id', authMiddleware, userController.getProfileById);

// Route to update the user's profile
route.put('/profile', authMiddleware, userController.updateProfile);

// Route to upload a user's avatar (profile picture)
route.post('/upload-avatar', authMiddleware, userController.uploadAvatar);

// Route to upload a user's CV
route.post('/upload-cv', authMiddleware, userController.uploadCV);

module.exports = route;
