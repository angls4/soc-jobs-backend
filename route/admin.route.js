const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifiedToken = require('../middleware/auth');

// // Route to get all admins
// router.get('/all', verifiedToken, adminController.getAllAdmins);

// // Route to get the admin's profile
// router.get('/profile', verifiedToken, adminController.getProfile);

// // Route to get a admin's profile by ID
// router.get('/profile/:id', verifiedToken, adminController.getProfileById);

// // Route to update the admin's profile
// router.put('/update', verifiedToken, adminController.updateProfile);

// // Route to upload a admin's avatar (profile picture)
// router.post('/avatar', verifiedToken, adminController.uploadAvatar);

module.exports = router;