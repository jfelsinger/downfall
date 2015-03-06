/**
 * main.js
 *
 * Standard scripts to be ran on every page, all pages-specific scripts should
 * include this file
 */

'use strict';
/* jslint browser: true */
/* globals io */

var debug = require('debug')('downfall');

// Setup globals
window.debug = debug;
window.vms = {};

// Setup sockets
var socket = io.connect('http://localhost:4004');
window.socket = socket;

socket.on('message', function(data) {
    debug(data);
});

socket.emit('ping');
