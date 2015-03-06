'use strict';

var debug = require('debug')('downfall:sockets:handler');

/**
 * Handler
 *
 * generic handler class
 */

var Handler = function(app, socket) {
    this.app = app;
    this.socket = socket;

    this.handlers = {};
};

Handler.prototype.register = function register() {
    for (var evt in this.handlers) {
        debug('registered event handler: ' + evt);
        this.socket.on(evt, this.handlers[evt]);
    }

    return this;
};

module.exports = Handler;
