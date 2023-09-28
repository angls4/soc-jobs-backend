const express = require('express');
const authController = require('../controllers/authController');
const googleAuthController = require('../controllers/googleAuthController');
const router = express.Router();

require('../config/googleOAuth');

// Route to login
router.post('/login', authController.login);

// Route to register
router.post('/register', authController.userRegister);

// Route to admin register
router.post('/admin-register', authController.adminRegister);

// Route to logout
router.post('/logout', authController.logout);

// Google authentication routes
router.get('/google', googleAuthController.googleLogin);
router.get('/google/callback', googleAuthController.googleCallback);
router.get('/google/protected', googleAuthController.googleProtected);
router.get('/google/success/:token', googleAuthController.googleSuccess);
router.get('/google/failure', googleAuthController.googleFailure);

// Route to test Google authentication
router.get('/google/test', googleAuthController.testGoogleAuth);

module.exports = router;