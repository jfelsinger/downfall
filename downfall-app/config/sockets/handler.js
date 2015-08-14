'use strict';

var debug = require('debug')('downfall:sockets:handler');

/**
 * Handler
 *
 * generic handler class
 */

var Handler = function(app, window, socket) {
    this.app = app;
    this.window = window;
    this.socket = socket;

    this.handlers = {};
};

Handler.prototype.register = function register() {
    var prefix = this.prefix;
    if (prefix) prefix += ':';

    for (var evt in this.handlers) {
        debug('registered event handler: ' + evt);
        this.socket.on(prefix + evt, this.handlers[evt]);
    }

    return this;
};

module.exports = Handler;
