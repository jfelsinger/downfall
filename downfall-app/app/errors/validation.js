'use strict';

module.exports = function(err, req, res, next) {
    if (err.name !== 'ValidationError')
        return next(err);
    // else:
    
    var responseErr = {
        message: err.message,
        errors: []
    };

    for (var key in err.errors) {
        responseErr.errors.push({
            path:    err.errors[key].path,
            message: err.errors[key].message,
        });
    }

    // send response
    res.status(400).json(responseErr);
};

