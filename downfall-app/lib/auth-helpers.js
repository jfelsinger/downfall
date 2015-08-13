'use strict';

var regex = require('./regex'),
    RequestError = require('./errors/request'),
    BPromise = require('bluebird');

module.exports = function(debug) {
    debug = debug || require('debug')('downfall:auth');
    var results = {};

    results.checkFor = {

        /**
         * Make sure that the email exists
         */
        email: function(req, chain) {
            return BPromise.method(function(email) {
                if (!email || !regex.email.test(email)) {
                    throw new RequestError('auth.error.no-email',4002);
                }

                return chain || email;
            });
        },

        /**
         * Make sure that the project/projectId exists
         */
        project: function(req, chain) {
            return BPromise.method(function(project) {
                debug('project: ', project);
                if (!project) {
                    throw new RequestError('auth.error.no-project',4005);
                }

                return chain || project;
            });
        },

        /**
         * Make sure that a username exists
         */
        username: function(req, chain) {
            return BPromise.method(function(username) {
                if (!username) {
                    throw new RequestError('auth.error.no-username',4001);
                }

                return chain || username;
            });
        },

        /**
         * Make sure that a password exists
         */
        password: function(req, chain) {
            return BPromise.method(function(password) {
                if (!password) {
                    throw new RequestError('auth.error.no-password',4004);
                }

                return chain || password;
            });
        },

        /**
         * Make sure that a password exists
         */
        facebookToken: function(req, chain) {
            return BPromise.method(function(fbToken) {
                if (!fbToken) {
                    throw new RequestError('auth.error.no-fb-token',4007);
                }

                return chain || fbToken;
            });
        },

    };

    results.checkFor.inRequest = {

        /**
         * Make sure that the email exists
         */
        email: BPromise.method(function(req) {
            return results.checkFor.email(req, req)(req.body.email);
        }),

        /**
         * Make sure that the project exists
         */
        project: BPromise.method(function(req) {
            return results.checkFor.project(req, req)(req.body.projectId);
        }),

        /**
         * Make sure that a username exists
         */
        username: BPromise.method(function(req) {
            return results.checkFor.username(req, req)(req.body.username);
        }),

        /**
         * Make sure that a password exists
         */
        password: BPromise.method(function(req) {
            return results.checkFor.password(req, req)(req.body.password);
        }),

        /**
         * Make sure that a password exists
         */
        facebookToken: BPromise.method(function(req) {
            return results.checkFor.facebookToken(req, req)(req.body.access_token);
        }),

    };

    return results;
};
