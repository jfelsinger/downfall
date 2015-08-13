/**
 * Local Register
 */
'use strict';

// var debug = require('debug')('subtasker:middlewares:authorization'),
//     chalk = require('chalk');

var // config = require(_root + '/config'),
    // async = require('async'),
    mongoose = require('mongoose');

/**
 * Registers a new local user
 */
module.exports = function(req, username, password, done) {
    var User = mongoose.model('User');

    User.findOne({ 'username': username }, function(err, user) {
        if (err) return done(err);

        if (user) {
            return done(
                null,
                false,
                { message: 'A user with that email already exists.' }
            );
        } else {
            var newUser = new User();

            newUser.username = username;
            newUser.email = req.body.email;
            newUser.name = req.body.name;
            newUser.password = password;

            newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
            });
        }
    });
};
