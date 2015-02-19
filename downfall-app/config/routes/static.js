'use strict';
/**
 * Static
 * Routes that manage static methods
 */

var express = require('express'),
    compression = require('compression'),
    config = require('../config');

module.exports = function(app) {
    var staticLocation = config.staticLocation || 'client';
    var assetsLocation = config.assetsLocation || 'client';

    app.use(compression());

    // Static client scripts
    app.use('/assets', express.static(config.root + '/' + assetsLocation));
    app.use(express.static(config.root + '/' + staticLocation));
};
