require ('dotenv').config();
const passport = require('passport');
// const {Strategy} = require('passport-google-oauth2');

// passport.use(new Strategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/auth/google/callback',
//     passReqToCallback: true

// }, (request, accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }
// ));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null,user);
});
