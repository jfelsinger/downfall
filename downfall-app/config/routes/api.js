/**
 * API
 * Routes that manage API methods
 */

var express = require('express'),
    config = require('../config');

module.exports = function(app) {
    var router = express.Router();

    // Make sure requests are marked as being part of the api
    router.use(function(req, res, next) {
        req.isApi = true;
        next();
    });

    app.use('/api', 
        router);
};
