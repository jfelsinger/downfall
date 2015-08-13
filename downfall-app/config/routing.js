/**
 * Routing
 * Setup request routing
 */

var debug = require('debug')('downfall:request');

module.exports = function(app, db, passport) {

    'use strict';

    // Allow all domains
    app.use(function(req, res, next) {
        var allowedMethods = [
            'GET', 'POST', 'OPTIONS',
            'PUT', 'PATCH', 'DELETE',
        ];

        var allowedHeaders = [
            'Origin',
            'Accept',
            'Content-Type',
            'x-access-token',
            'X-Access-Token',
            'X-Requested-With',
            'X-HTTP-Method-Override',
        ];

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', allowedMethods.join(', '));
        res.header('Access-Control-Allow-Headers', allowedHeaders.join(', '));
        res.header('Access-Control-Allow-Credentials', true);

        debug('remoteAddress: ', req.connection.remoteAddress);
        debug('x-forwarded-for: ', req.headers['x-forwarded-for']);

        debug('req.method: ', req.method);
        if (req.method === 'OPTIONS')
            return res.send();

        next();
    });


    // ==== Process Routes ====

    // Routes handling static assets
    require(_root + '/config/routes/static')(app, db);

    // Routes handling authorization
    require(_root + '/config/routes/auth')(app, db, passport);

    // Routes handling api requests
    require(_root + '/config/routes/api')(app, db);

    // Routes handling application controllers
    require(_root + '/config/routes/controllers')(app, db);

};
