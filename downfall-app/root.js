'use strict';

var path = require('path'),
        basePath = path.normalize(__dirname);

module.exports = GLOBAL._root = basePath;
