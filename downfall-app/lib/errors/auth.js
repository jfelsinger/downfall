'use strict';

var extend = require('../extend'),
    RequestError = require('./request');

/**
 * A network error
 */
function AuthError() {
    RequestError.apply(this, arguments);
    this.code = this.code || 4400;
    this.name = 'AuthError';
    this.status = 401;
}

extend(AuthError, RequestError);

module.exports = AuthError;
