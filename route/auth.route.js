const express = require('express');
const authController = require('../controllers/authController');
const googleAuthController = require('../controllers/googleAuthController');
const route = express.Router();

require('../config/googleOAuth');

// Local authentication routes
route.post('/login', authController.login);
route.post('/register', authController.register);
route.post('/logout', authController.logout);

// Google authentication routes
route.get('/google', googleAuthController.googleLogin);
route.get('/google/callback', googleAuthController.googleCallback);
route.get('/google/protected', googleAuthController.googleProtected);
route.get('/google/success/:token', googleAuthController.googleSuccess);
route.get('/google/failure', googleAuthController.googleFailure);
route.get('/google/test', googleAuthController.testGoogleAuth);

module.exports = route;