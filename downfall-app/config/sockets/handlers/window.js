'use strict';
/* jslint latedef:false */

var debug = require('debug')('downfall:sockets:handlers:window');

var extend = require(_root + '/lib/extend'),
    Handler = require('../handler');

var WindowHandler = function() {
    Handler.apply(this, arguments);
    this.prefix = 'window';

    // Expose handler methods
    this.handlers = {
        openDevTools: this.openDevTools.bind(this),
        closeDevTools: this.closeDevTools.bind(this),
    };
};

extend(WindowHandler, Handler);

/**
 * Open the dev tools on the set window
 */
WindowHandler.prototype.openDevTools = 
function openWindowDevTools() {
    debug('open dev tools');
    this.window.openDevTools();
    this.socket.emit('dev-tools:state', 'open');
};

/**
 * Close the dev tools on the set window
 */
WindowHandler.prototype.closeDevTools = 
function closeWindowDevTools() {
    debug('close dev tools');
    this.window.closeDevTools();
    this.socket.emit('dev-tools:state', 'closed');
};

module.exports = WindowHandler;
