const { Router } = require('express');
const router = Router();
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const jobRoute = require('./job.route');
const adminRoute = require('./admin.route');
const applicationRoute = require("./application.route");
const {verifiedToken} = require('../middleware/auth');

// Route to the auth route
router.use('/auth', authRoute);

// Route to the user router
router.use('/user', verifiedToken, userRoute);

// // Route to the admin router
// router.use('/admin', verifiedToken, adminRoute);

// Route to the job router
router.use('/job', verifiedToken, jobRoute);

// Route to the job router
router.use('/application', verifiedToken, applicationRoute);

module.exports = router;