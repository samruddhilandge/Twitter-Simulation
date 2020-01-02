'use strict';
var passport = require('../node_modules/passport');
var JwtStrategy = require('../node_modules/passport-jwt').Strategy;
var ExtractJwt = require('../node_modules/passport-jwt').ExtractJwt;
var Users = require('../database/UserSchema');

var config = require('./settings');

// Setup work and export for the JWT passport strategy
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret_key
};
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("JWT Payload:", jwt_payload);
    Users.findOne({ username: jwt_payload.username }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            delete user.password;
            console.log("Authentication valid");
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;