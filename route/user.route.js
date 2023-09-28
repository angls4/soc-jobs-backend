const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifiedToken = require('../middleware/auth');
const { uploadAvatar, uploadCV } = require('../config/multerConfig');

// Middleware for authentication
router.use(verifiedToken);

// Routes for user-related actions
router.get('/', userController.getAllUsers);
router.get('/profile', userController.getProfile);
router.get('/profile/:id', userController.getProfileById);
router.put('/update/:id', userController.updateProfile);

// Routes for file uploads
router.post('/avatar', uploadAvatar.single('avatar'), userController.uploadAvatar);
router.post('/cv', uploadCV.single('cv'), userController.uploadCV);

module.exports = router;
