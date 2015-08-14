'use strict';

var debug = require('debug')('downfall:io');
var walk = require('../../lib/walk');

/**
 * Socket.io Setup
 *
 * Setup and configure sockets and handlers
 */
function SocketServer(/* _app */) {
    this.app = {
        allSockets: []
    };
}

SocketServer.prototype.start = function(_app, window, cb) {
    this.io = require('socket.io')(_app);

    this.io.on('connection', function(socket) {
        debug('new socket connection');

        walk(__dirname + '/handlers', function(path) {
            var Handler = require(path),
                handler = new Handler(this.app, window, socket);

            handler.register();
        }.bind(this));

        // Keep track of the socket
        this.app.allSockets.push(socket);
    }.bind(this));

    if (typeof(cb) === 'function') cb();
};

module.exports = new SocketServer();
