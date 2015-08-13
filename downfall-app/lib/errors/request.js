'use strict';

var extend = require('../extend'),
    GenericError = require('./generic');

/**
 * A network error
 */
function RequestError() {
    GenericError.apply(this, arguments);
    this.name = 'RequestError';
    this.status = 400;
}

extend(RequestError, GenericError);

module.exports = RequestError;
