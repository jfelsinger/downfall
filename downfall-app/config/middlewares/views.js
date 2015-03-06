/**
 * Views
 * Setup the view engine
 */

var debug = require('debug')('downfall:server:middlewares:views');

var hbs = require('hbs'),
    moment = require('moment'),
    swag = require('swag'),
    slug = require('slug');

module.exports = function(app) {

    'use strict';

    var partialsPath = __dirname + '/../../views/partials/';
    swag.Config.partialsPath = partialsPath;
    hbs.registerPartials(partialsPath);

    // Helpers
    hbs.registerHelper('json', JSON.stringify);

    hbs.registerHelper('moment', function(format, value) {
        // Just make it default to `de` in here
        moment.locale('de');
        return moment(value).format(format);
    });

    hbs.registerHelper('include', function(options) {
        var context = {},
            mergeContext = function(obj) {
                for (var k in obj) context[k] = obj[k];
            };

        mergeContext(this);
        mergeContext(options.hash);
        return options.fn(context);
    });

    hbs.registerHelper('dbg', function() {
        var args = Array.prototype.slice.call(arguments, 0, -1);
        debug('debug view:\r\n', args);
    });

    hbs.registerHelper('slug', function(text) {
        if(text === undefined) return text;
        return slug(text, '-');
    });

    swag.registerHelpers(hbs);

    app.set('view engine', 'html');
    app.engine('html', hbs.__express);
};
