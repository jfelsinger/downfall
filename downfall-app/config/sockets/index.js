'use strict';

var debug = require('debug')('downfall:io');
var walk = require('../../lib/walk');

/**
 * Socket.io Setup
 *
 * Setup and configure sockets and handlers
 */
function SocketServer(_app) {
    this.app = {
        allSockets: []
    };
};

SocketServer.prototype.start = function(_app, cb) {
    this.io = require('socket.io')(_app);

    this.io.on('connection', function(socket) {
        // debug('new sockets connection: ', socket);

        walk(__dirname + '/handlers', function(path) {
            var Handler = require(path),
                handler = new Handler(this.app, socket);

            handler.register();
        }.bind(this));

        // Keep track of the socket
        this.app.allSockets.push(socket);
    }.bind(this));

    if (typeof(cb) === 'function') cb();
}

module.exports = new SocketServer();
