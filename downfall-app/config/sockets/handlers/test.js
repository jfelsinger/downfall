'use strict';
/* jslint latedef:false */

var extend = require(__root + '/lib/extend'),
    Handler = require('../handler');

var Test = function() {
    Handler.apply(this, arguments);

    // Expose handler methods
    this.handlers = {
        ping: ping.bind(this),
    };
};

extend(Test, Handler);

// Events

function ping() {
    /* jshint validthis:true */
    // Reply to sender
    this.socket.emit('message', 'PONG');
}

module.exports = Test;
