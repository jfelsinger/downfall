/**
 * Auth
 * Routes that manage auth methods
 */

var async = require('async'),
    express = require('express'),
    config = require('../config');

module.exports = function(app, passport) {
    var router = express.Router();

    // Register routes for local authentication
    router.use('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }));

    router.use('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.use('/auth', router);
};
