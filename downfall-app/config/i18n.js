'use strict';

/**
 * i18n
 * Enable support for i18n localization
 */

var debug = require('debug')('downfall:server:middlewares:i18n');

var i18n = require('i18n'),
    hbs = require('hbs'),
    config = require('../config');

module.exports = function(app) {

    // Configure i18n
    var i18nConfiguration = config.i18n || {
        locales: ['en'],
        cookie: 'locale',
    };

    i18nConfiguration.objectNotation = true;
    i18nConfiguration.directory = _root + '/config/i18n';
    i18n.configure(i18nConfiguration);

    //
    // Register helper functions to hbs
    //

    hbs.registerHelper('__', function() {
        var args = Array.prototype.slice.call(arguments, 0, -1),
            result = i18n.__.apply(this, args);
        debug('i18n - ' + i18n.getLocale() + ':\r\n' +
            args, result);

        return result;
    });

    hbs.registerHelper('__n', function() {
        var args = Array.prototype.slice.call(arguments, 0, -1),
            result = i18n.__n.apply(this, args);
        debug('i18n - ' + i18n.getLocale() + ':\r\n' +
            args, i18n.__n.apply(this, args));
        return result;
    });


    app.use(i18n.init);
};
