// Module Dependencies
var express = require('express');

// Load configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
    config = require('./config/config'),
    mongoose = require('mongoose');

// Connect to database
var db = mongoose.connect(config.db);

// Load models
var models_path = __dirname + '/models';
require('./lib/walk')(models_path, require);

var app = express();

// Configuration
require('./config/express')(app);

// Start the application
var port = config.port;
app.listen(port);
console.log('Express application started on port ' + port);

// Show yourself
exports = module.exports = app;
