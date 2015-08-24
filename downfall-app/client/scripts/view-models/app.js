'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:vms:app');

var Vue = require('vue');
var socket = require('../lib/socket');

module.exports = Vue.extend({
    data: function() {
        return {
            isLoaded: false,

            settings: {
                controls: {
                    // movement
                    forward:    { type: 'key', which: 87 },
                    back:       { type: 'key', which: 87 },
                    left:       { type: 'key', which: 87 },
                    right:      { type: 'key', which: 87 },

                    // combat
                    skill1:     { type: 'mouse', which: 1 },
                    skill2:     { type: 'mouse', which: 3 },
                    skill3:     { type: 'key', which: 69 },
                    skill4:     { type: 'key', which: 82 },

                    special1:   {},
                    special2:   {},
                    special3:   {},

                    weaponChange:   {},

                    item1:  {},
                    item2:  {},
                    item3:  {},
                    item4:  {},
                    item5:  {},
                    item6:  {},
                },
            },
        };
    },

    ready: function() {
        this.isLoaded = true;

        window.addEventListener('contextmenu', this.contextMenuHandler);
    },

    methods: {
        openDevTools: function() {
            socket.emit('window:openDevTools');
        },

        keypress: function(e) {
            debug('keypress event: ', e);

            this.toggleDevTools();
        },

        keydown: function(e) {
            debug('keydown event: ', e);

            if (e.which === 123) // <f12>
                return;
            // else:
        },

        keyup: function(e) {
            debug('keyup event: ', e);

            if (e.which === 123) // <f12>
                return this.openDevTools();
            // else:
        },

        mousedown: function(e) {
            debug('mousedown event: ', e);
        },

        mouseup: function(e) {
            debug('mouseup event: ', e);
        },

        mousewheel: function(e) {
            debug('mousewheel event: ', e);
        },

        contextMenuHandler: function(e) {
            debug('contextMenu event: ', e);
        },
    }
});
