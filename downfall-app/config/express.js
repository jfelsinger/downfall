'use strict';

/**
 * Express Setup
 *
 * Setup and configure the express application
 */

var debug = require('debug')('downfall:config:express'),
    chalk = require('chalk');

var bodyParser = require('body-parser'),
    passport = require('passport');

module.exports = function(app) {

    app.set('json spaces', 4);
    app.set('showStackError', true);
    app.enable('jsonp callback');

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(require('morgan')('dev'));

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        debug(chalk.yellow('WARNING') + ': allowing self-signed certs for ' +
            'development. Make sure to user proper ssl certifications in ' +
            'production environment');
    }

    app.use(require('method-override')());
    app.use(require('compression')());

    // Setup Db
    var db = require(_root + '/config/database')(app);

    // Setup i18n
    require(_root + '/config/i18n')(app);

    // Setup view engine
    require(_root + '/config/views')(app);

    // parse application/json requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup passport
    require(_root + '/config/passport')(passport);
    app.use(passport.initialize());

    // Continue to routing,
    require(_root + '/config/routing')(app, db, passport);

    // Error handling
    // require(_root + '/config/errors')(app);
};
