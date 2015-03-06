'use strict';

/**
 * API
 * Routes that manage API methods
 */

var // config = require('../config'),
    express = require('express');

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
