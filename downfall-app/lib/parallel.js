var async = require('async');

/**
 * Parallel
 *
 * Run functions, usually middleware, in parallel
 */
module.exports = function parallel(middlewares) {

    'use strict';

    return function(req, res, next) {
        async.each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
};
