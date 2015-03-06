'use strict';

/**
 * Express Setup
 *
 * Setup and configure the express application
 */

var session = require('express-session'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    i18n = require('i18n'),
    parallel = require('../lib/parallel'),
    passport = require('passport');

var config = require('./config');

module.exports = function(app) {

    app.set('showStackError', true);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }

    app.enable('jsonp callback');

    app.use(parallel([
        cookieParser(config.secret),
        session({
            secret: config.secret,
            resave: false,
            saveUninitialized: false
        })
    ]));

    // i18n can be configured after cookieParser is loaded
    require('./middlewares/i18n')(app);

    app.use(parallel([
        methodOverride(),
        i18n.init
    ]));

    require('./middlewares/views')(app);

    // parse application/json requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup passport
    require('./middlewares/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // Continue to routing,
    require('./middlewares/routing')(app, passport);

    // Error handling
    require('./middlewares/errors')(app);
};
