/**
 * Result Data
 * Adds data to be returned by the result
 */

module.exports = function(req, res, next) {

    'use strict';

    if (!res.data) res.data = {};

    var render = res.render;
    res.render = function r(view, locals, cb) {
        if (locals)
            for (var prop in locals)
                res.data[prop] = locals[prop];

        return render.apply(res, [view, res.data, cb]);
    };


    // Add extra properties to response data
    // Flash Data
    res.data.info = req.flash('info');
    res.data.errors = req.flash('error');

    // Defaulf layout
    res.data.layout = 'layouts/main';

    // User
    if (req.isAuthenticated() && req.user) 
        res.data.user = req.user;


    next();
};
