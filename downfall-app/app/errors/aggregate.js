'use strict';

var debug = require('debug')('downfall:errors:aggregate');

var BPromise = require('bluebird'),
    GenericError = require(_root + '/lib/errors/generic');

module.exports = function(err, req, res, next) {
    if (!(err instanceof BPromise.AggregateError))
        return next(err);
    // else:
    
    debug(err);

    var errs = [];
    for (var i = 0; i < err.length; i++) {
        if (err[i] instanceof GenericError ||
            err[i].prototype instanceof GenericError) { 
            err[i].message = req.__(err[i].message);
            errs.push(err[i].response);
        } else {
            errs.push(err[i]);
        }
    }

    err = new GenericError(req.__('error.aggregate.message'), 4800);
    err.description = req.__('error.aggregate.description');
    err.errors = errs;
    err.status = 400;

    next(err);
};
