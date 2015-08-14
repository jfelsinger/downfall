'use strict';

var debug = require('debug')('downfall:server'),
    chalk = require('chalk');

// Make sure we're using the right directory
process.chdir(__dirname);

require('./root');
require('./config/memwatch');

// Module Dependencies
var express = require('express'),
    async = require('async');

// Load configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    config = require('./config/config'),
    sockets = require('./config/sockets');

var app = express();

// Configuration
require('./config/express')(app);

// Show yourself
exports = module.exports = function(window, cb) {
    var server,
        port = config.port;

    // Start the application
    async.series([
        function(cb) {
            server = app.listen(port, function() {
                debug('Express application started on port `' + chalk.yellow('%s') + '`', port);
                debug('Environment: ' + chalk.yellow('%s'), env);
                cb();
            });
        },
        function(cb) {
            sockets.start(server, window, cb);
        },
    ], function() {
        setTimeout(function() {
            cb(app);
        }, 100);
    });
};
