/**
 * Create an md5 hash
 */
module.exports = function md5(data) {
    'use strict';

    return require('crypto')
        .createHash('md5')
        .update(data)
        .digest('hex');
};
