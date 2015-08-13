'use strict';

var GenericError = require(_root + '/lib/errors/generic');

module.exports = function(err, req, res, next) {
    if (!(err instanceof GenericError ||
          err.prototype instanceof GenericError))
        return next(err);
    // else:

    err.message = req.__(err.message);
    res.status(err.status || 500).json(err.response);
};
