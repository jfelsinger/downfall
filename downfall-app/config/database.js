'use strict';

/**
 * Database Setup
 *
 * Configure and setup mongo and its components
 */
var debug = require('debug')('downfall:config:database');

var config = require('./'),
    mongoose = require('mongoose'),
    fs = require('fs');

// Use mongo-lab credentials from CC
var cred = process.env.CRED_FILE;
if (cred) {
    cred = fs.readFileSync(cred, 'utf8');
    if (typeof(cred) === 'string')
        cred = JSON.parse(cred);
}

cred = cred && cred.MONGOLAB && cred.MONGOLAB.MONGOLAB_URI;
debug('CC MONGO CREDENTIALS: ', cred);

module.exports = function() {

    // Connect mongoose to the database
    mongoose.connect(cred || config.db);

    // Load models
    // require('downfall-schemas')(mongoose);
    require(_root + '/models/users');

    return mongoose;
};
