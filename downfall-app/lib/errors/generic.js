'use strict';

/**
 * A network error
 */
function GenericError(message, code) {
    this.code = code;
    this.name = 'GenericError';
    this.message = message || '';
}

GenericError.prototype = Object.create(Error.prototype);

Object.defineProperty(GenericError.prototype, 'response', {
    get: function() {
        return {
            code: this.code,
            message: this.message,
            description: this.description,
            errors: this.errors,
            wait: this.wait,
        };
    }
});

module.exports = GenericError;
