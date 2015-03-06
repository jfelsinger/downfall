
var debug = require('debug')('downfall:server');

// Make sure we're using the right director
process.chdir(__dirname);

// Module Dependencies
var express = require('express'),
    async = require('async');

// Load configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    config = require('./config/config'),
    sockets = require('./config/sockets'),
    mongoose = require('mongoose');

// Connect to database
// var db = mongoose.connect(config.db);

// Load models
var models_path = __dirname + '/models';
require('./lib/walk')(models_path, require);

var app = express();

// Configuration
require('./config/express')(app);

// Show yourself
exports = module.exports = function(cb) {
    var server;

    // Start the application
    var port = config.port;
    async.series([
        function(cb) {
            server = app.listen(port, function() {
                debug('Express application started on port ', port);
                debug('Environment: ', env);
                cb();
            });
        },
        function(cb) {
            sockets.start(server, cb);
        },
    ], function() {
        cb(app);
    });
};
