'use strict';
/**
 * Controllers
 * Routes that manage controller methods
 */

var express = require('express'),
    fs = require('fs'),
    config = require('../config'),
    parallel = require(config.root + '/lib/parallel');

module.exports = function(app) {
    // Set opinionated defaults if the config has none for itself
    var defaultController = config.defaultController || 'index';
    var defaultMethod = config.defaultMethod || 'render';
    var router = express.Router();
    var auth = require('../auth');

    router.use(parallel([
        require('./../middlewares/result-data')
    ]));


    router.get('/:page/:method/:id', routeToController());
    router.get('/:page/:method', routeToController());
    router.get('/:page/:id', routeToController());
    router.get('/:page', routeToController());
    router.get('/', routeToController());


    /**
     * catch-all to include any extra data that a controller
     * might be expecting.
     *
     * req.params[0] starts at the first of the wild-cart params
     */ 
    function routeToController(appPath) {
        appPath = appPath || '';
        if (appPath.length && appPath[appPath.length - 1] !== '/')
            appPath += '/';

        return function(req, res, next) {
            var page = req.params.page || defaultController || '',
                method = req.params.method || '',
                controllerPath = config.root + '/app/controllers/' + appPath + page,
                controller = null;

            if (fs.existsSync(controllerPath + '.js')) {
                controller = require(controllerPath);
            } else {
                console.log('1. Bad request: ' + page);
                return next();
            }

            // Check for valid controller and method
            if (controller) {

                // Run the given method, if there is one
                if (method)
                {

                    if (controller[method]) {
                        controller[method](req, res, next);
                    } else {
                        console.log('2. Bad request: ' + page + '/' + method);
                        next();
                    }

                // if not try to run the default instead
                } else {

                    if (controller[defaultMethod]) {
                        controller[defaultMethod](req, res, next);
                    } else {
                        console.log(
                            'Bad request: ' + page + 
                            ' doesn\' implement default method `' + 
                            defaultMethod + '`');
                        next(); // there is no  method, :(
                    }
                }
            } else {
                // it was all a lie
                console.log('3. Bad request: ' + page);
                next();
            }
        };
    }

    // Register routes
    app.use('/', router);
};
