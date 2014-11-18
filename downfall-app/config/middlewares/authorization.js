/**
 * Authorization
 *
 * Methods to handle registration and authorization of users through different
 * services, a.k.a. goodle, facebook, etc.
 */
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Registers a new local user
 */
module.exports.localRegister = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (user) {
            return done(
                null, 
                false, 
                { message: 'A user with that email already exists.' }
            );
        } else {
            var newUser = new User();

            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = password;

            newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
            });
        }
    });
};

/**
 * Authenticates a user locally, or creates a new user if one doesn't exist
 */
module.exports.localLogin = function(req, email, password, done) {
    User.findOne({ 'email': email }, function(err, user) {
        if (err) return done(err);

        if (!user || !user.authenticate(password)) {
            return done(null, false, { message: 'Wrong email or password.' });
        }

        return done(null, user);
    });
};
