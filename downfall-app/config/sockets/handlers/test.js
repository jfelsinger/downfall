'use strict';
/* jslint latedef:false */

var extend = require(_root + '/lib/extend'),
    Handler = require('../handler');

var Test = function() {
    Handler.apply(this, arguments);

    // Expose handler methods
    this.handlers = {
        ping: this.ping.bind(this),
    };
};

extend(Test, Handler);

// Events

Test.prototype.ping = 
function ping() {
    /* jshint validthis:true */
    // Reply to sender
    this.socket.emit('message', 'PONG');
};

module.exports = Test;
