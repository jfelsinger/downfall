/**
 * main.js
 *
 * Standard scripts to be ran on every page, all pages-specific scripts should
 * include this file
 */

'use strict';
/* jslint browser: true */
/* globals io */

// require('polyfill-webcomponents');
// require('../js/vendor/webcomponentsjs/webcomponents.js');

// Code here:

var socket = io.connect('http://localhost:4004');
window.socket = socket;

socket.on('message', function(data) {
    console.log(data);
});

socket.emit('ping');
