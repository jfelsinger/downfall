var session = require('express-session'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    i18n = require('i18n'),
    methodOverride = require('method-override'),
    parallel = require('../lib/parallel'),
    passport = require('passport');

var config = require('./config');

module.exports = function(app) {
    app.set('showStackError', true);

    // No logger on test environment
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }

    app.enable("jsonp callback");

    app.use(parallel([
        cookieParser(),
        session({
            secret: config.secret,
            resave: false,
            saveUninitialized: false
        })
    ]));

    // i18n can be configured after cookieParser is loaded
    require('./middlewares/i18n')(app);

    app.use(parallel([
        flash(),
        methodOverride(),
        i18n.init
    ]));

    // Setup view engine
    require('./middlewares/views')(app);

    // Setup passport
    require('./middlewares/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // parse application/json requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Continue to routing, 
    require('./middlewares/routing')(app, passport);

    // Error handling
    require('./middlewares/errors')(app);
}
