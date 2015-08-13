/**
 * Errors
 * Handling for error responses
 */

'use strict';

var config = require('./'),
    errors = require(config.root + '/app/errors');

module.exports = function(app) {

    app.use(errors.aggregate);
    app.use(errors.general);
    app.use(errors.validation);
    app.use(errors._500);
    app.use(errors._404);

};
