/**
 * main.js
 *
 * Standard scripts to be ran on every page, all pages-specific scripts should
 * include this file
 */

'use strict';
/* jslint browser: true */

var _debug = require('debug'),
    debug = _debug('downfall');

_debug.enable('*');

// Setup globals
window._debug = _debug;
window.vms = {};

var socket = require('./lib/socket');

socket.on('message', function(data) {
    debug(data);
});

socket.emit('ping');
