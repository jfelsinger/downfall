'use strict';
/**
 * API
 * Routes that manage API methods
 */

var debug = require('debug')('downfall:routes:api'),
    chalk = require('chalk');

var config = require(_root + '/config'),

    // CheckIf = require(_root + '/lib/check-if'),
    // is = require(_root + '/lib/is'),
    // checkIf = require(_root + '/config/auth'),

    // appApi = require(_root + '/app/api'),
    info = require(_root + '/package'),
    getRequestToken = require(_root + '/lib/get-request-token'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    router = express.Router();

module.exports = function(app, db) {

    // Make sure that requests are marked as being part of the api
    router.use(function(req, res, next) {
        req.isApi = true;
        next();
    });

    router.use(function(req,res,next) {
        debug('x-access-token: %s', req.headers && req.headers['x-access-token']);
        debug('query.token: %s', req.query.token);
        var token = getRequestToken(req);

        jwt
            .verifyAsync(token, config.secret)
            .then(function(decodedToken) {
                debug(chalk.green('token: '), decodedToken);
                req.decodedToken = decodedToken;
            })
            .catch(function(err) {
                debug('err: ', err);
            })
            .finally(next);
    });


    // /**
    //  * Add the user and other information to the request
    //  */
    // router.use(require(_root + '/config/middlewares/auth-info'));

    router.use('/token', function(req, res) {
        res.json(req.decodedToken);
    });

    require('../params')(router, db);

    router.use('/info', function(req, res) {
        res.json({
            'started': config.started,
            'uptime': Date.now() - config.started.getTime(),
            'app.name': config.app.name,
            'port': config.port,
            'version': info.version,
            'decodedToken': req.decodedToken,
        });
    });


    router.use('/now', function(req, res) {
        var moment = require('moment')();
        var now = new Date();

        res.json({
            timezone: process.env.TZ || '---',
            date: {
                now:now,
                unix:now.valueOf(),
                str:now.toString(),
                iso:now.toISOString(),
            },
            moment: {
                unix:moment.valueOf(),
                str:moment.format('LLL'),
                iso:moment.format(),
            }

        });
    });

    app.use('/api', router);
};
