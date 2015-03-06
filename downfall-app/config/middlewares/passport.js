'use strict';

/**
 * Passport
 * Sets up passport authentication management middleware
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    authorization = require('./authorization');

var LocalStrategy       = require('passport-local').Strategy;

module.exports = function(passport) {
    // Serializes a user object into just an id
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserializes a user object from an id
    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .exec(function(err, user) {
                done(err, user);
            });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authorization.localRegister));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, authorization.localLogin));
};
