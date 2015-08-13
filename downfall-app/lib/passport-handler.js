'use strict';

var debug = require('debug')('downfall:lib:passport-handler'),
    chalk = require('chalk'),
    RequestError = require('./errors/request');

module.exports = function(passport, method) {
    return function(req, res, next) {
        passport.authenticate(
            method, 
            function(err, user, info) {
                debug(chalk.yellow('args')+': \r\n', arguments);

                if (err)    return next(err);
                if (info)   return next(info);
                if (!user) {
                    err = new RequestError('auth.error.no-user',4406);
                    err.status = 400;
                    return next(err);
                }

                req.user = user;
                next();
            })(req, res, next);
    };
};
