'use strict';

var extend = require('../extend'),
    GenericError = require('./generic');

/**
 * A network error
 */
function NetworkError() {
    GenericError.apply(this, arguments);
    this.name = 'NetworkError';
}

extend(NetworkError, GenericError);

module.exports = NetworkError;
