'use strict';

var debug = require('debug')('downfall:lib:is');

var config = require('../config'),
    AuthError = require(_root + '/lib/errors/auth');

module.exports = {
    /**
     * Check the validity of a password
     */
    passwordValid: function isPasswordValid(passwordField, userField) {
        var method = config.auth.hash.method;
        var key = config.auth.hash.key;

        userField = userField || 'user';
        passwordField = passwordField || 'password';

        return function isPasswordValidResult(req, res, next) {
            if (req.body[passwordField] &&
                req[userField] &&
                req[userField].checkPassword &&
                req[userField].checkPassword(req.body[passwordField], method, key))
                return next();
            // else:

            var err = new AuthError('auth.failed',4404);
            err.status = 400;
            next(err);
        };
    },

    /**
     * Middleware to check if targetted by a field
     */
    target: function isTarget(field) {
        return function isTargetResult(req, res, next) {
            if (req.decodedToken &&
                req[field] &&
               (req[field].target === req.decodedToken.profileId ||
                req[field].target === req.decodedToken.userId))
                return next();
            // else:

            var err = new AuthError('request.unauthorized',4401);
            err.status = 403;
            next(err);
        };
    },

    /**
     * Middleware to check ownership on a field
     */
    owner: function isOwner(field) {
        return function isOwnerResult(req, res, next) {
            if (req.decodedToken &&
                req[field] && 
               (req[field].owner === req.decodedToken.profileId ||
                req[field].owner === req.decodedToken.userId ||
                req[field]._id === req.decodedToken.profileId ||
                req[field]._id === req.decodedToken.userId))
                return next();
            // else:

            var err = new AuthError('request.unauthorized',4401);
            err.status = 403;
            next(err);
        };
    },


    /**
     * returns a middleware that gives a 401 response if the request is not
     * authenticated
     */
    authorized: function isAuthorized(role) {

        return function isAuthorizedResult(req, res, next) {
            var err;

            if (req.decodedToken && 
                req.decodedToken.profileId &&
                req.decodedToken.userId) {

                if (!role || (req.decodedToken.roles &&
                   (req.decodedToken.roles.indexOf(role) !== -1))) {
                    debug('authorized() - -> success');
                    return next();
                } // else:

                debug('authorized() - -> not authorized');
                err = new AuthError('request.unauthorized',4401);
                err.status = 403;
                return next(err);
            } // else:

            debug('authorized() - -> not authenticated');
            err = new AuthError('request.unauthenticated',4402);
            err.status = 403;
            next(err);
        };
    },


    /**
     * returns a middleware function that redirects if the request is
     * not authenticated
     */
    loggedIn: function isLoggedIn(req, res, next) {
        if (req.decodedToken) {
            return next();
        } // else:

        var err = new AuthError('request.unauthenticated',4402);
        err.status = 403;
        next(err);
    },


    /**
     * returns a middleware function that redirects if the request is
     * authenticated
     */
    notLoggedIn: function isNotLoggedIn(req, res, next) {
        if (!req.decodedToken) {
            return next();
        } // else:

        var err = new AuthError('request.ununauthenticated',4405);
        err.status = 400;
        next(err);
    },

};
