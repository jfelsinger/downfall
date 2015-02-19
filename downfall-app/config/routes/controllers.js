'use strict';
/* jslint latedef:false */
var debug = require('debug')('downfall:server:routes:controllers');

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
    var dataLoaders = [
        require('../middlewares/data/page'),
    ];

    router.param(function(name, fn) {
        if (fn instanceof RegExp) {
            return function(req, res, next, val) {
                var captures = fn.exec(String(val));
                if (captures) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            };
        }
    });

    router.use(require('../middlewares/result-data'));

    // id: a numeric id (any length of digits) or an uuid.v4
    router.param('id', /^(\d+|\w+::\w{8}(-\w{4}){3}-\w{12})$/);
    router.param('method', /^[a-zA-Z_]+$/);

    router.get('/:page/:method/:id?/:__x?', routeToController());
    router.get('/:page/:id?/:__x?', routeToController());
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
            debug(req.params);
            var page = req.params.page || defaultController || '',
                method = req.params.method || '',
                controllerPath = config.root + '/app/controllers/' + appPath + page,
                controller = null;

            if (fs.existsSync(controllerPath + '.js')) {
                controller = require(controllerPath);
            } else {
                debug('1. Bad request: ' + page);
                return next();
            }

            // Check for valid controller and method
            if (controller) {

                // Run the given method, if there is one
                if (method)
                {

                    if (controller[method]) {
                        parallel(dataLoaders)(req, res, function() {
                            controller[method](req, res, next);
                        });
                    } else {
                        debug('2. Bad request: ' + page + '/' + method);
                        next();
                    }

                // if not try to run the default instead
                } else {

                    if (controller[defaultMethod]) {
                        parallel(dataLoaders)(req, res, function() {
                            controller[defaultMethod](req, res, next);
                        });
                    } else {
                        debug(
                            'Bad request: ' + page +
                            ' doesn\' implement default method `' +
                            defaultMethod + '`');
                        next(); // there is no  method, :(
                    }
                }
            } else {
                // it was all a lie
                debug('3. Bad request: ' + page);
                next();
            }
        };
    }


    // Register routes
    app.use('/', 
        router);
};
