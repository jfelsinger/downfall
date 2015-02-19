/**
 * Call
 *
 * Call a function with arguments
 */
module.exports = function callFunction(func) {

    'use strict';

    var args = Array.prototype.slice.call(arguments, 0);
    return function() {
        callFunction.apply(this, args);
    };
};
