/**
 * Local Login
 */
'use strict';

var // config = require(_root + '/config'),
    // async = require('async'),
    mongoose = require('mongoose');

/**
 * Authenticates a user locally, or creates a new user if one doesn't exist
 */
module.exports = function(req, username, password, done) {
    var User = mongoose.model('User');

    User.findOne({ 'username': username }, function(err, user) {
        if (err) return done(err);

        if (!user || !user.authenticate(password)) {
            return done(null, false, { message: 'Wrong email or password.' });
        }

        return done(null, user);
    });
};

