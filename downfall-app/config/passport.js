'use strict';

/**
 * Passport
 * Sets up passport authentication management middleware
 */

var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, require('./auth/strategies/local-login')));

    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, require('./auth/strategies/local-register')));

};
