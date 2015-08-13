'use strict';

var extend = require('../extend'),
    RequestError = require('./request');

/**
 * A network error
 */
function QueryError() {
    RequestError.apply(this, arguments);
    this.name = 'QueryError';
}

extend(QueryError, RequestError);

module.exports = QueryError;
