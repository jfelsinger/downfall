/**
 * Parallel
 *
 * Load middlewares in parallel
 */
module.exports = function parallel(middlewares) {

    'use strict';

    return function(req, res, next) {
        require('async').each(middlewares, function(mw, cb) {
            mw(req, res, cb);
        }, next);
    };
};
