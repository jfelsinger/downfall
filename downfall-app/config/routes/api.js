/**
 * API
 * Routes that manage API methods
 */

var async = require('async'),
    express = require('express');

module.exports = function(app) {
    var router = express.Router();

    app.use('/api', router);
};
