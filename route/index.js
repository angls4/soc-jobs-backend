const { Router } = require('express');
const route = Router();
const authRoute = require('./auth.route');
// const userRoute = require('./user.route');

const verifiedToken = require('../middleware/auth');

route.use('/auth', authRoute);
// route.use('/user', verifiedToken, userRoute);

module.exports = route;