'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:vms:app');

require('../components/pane-settings');
require('../components/pane-game');
require('../components/pane-home');
require('../components/pane-servers');

var Vue = require('vue');

module.exports = function(selector) {
    selector = selector || '.js-vm-app';

    return new Vue({
        el: selector,
        data: {
            isLoaded: false,

            pane: null,
            activePane: null,

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
        },

        ready: function() {
            this.isLoaded = true;
            this.setPane('settings');

            window.addEventListener('contextmenu', this.contextMenuHandler);
        },

        methods: {
            setPane: function(name, e) {
                this.pane = name;

                setTimeout(function() {
                    this.activePane = this.$['child__' + name];
                }.bind(this), 1);

                if (e) e.preventDefault();
            },

            keydown: function(e) {
                debug('keydown event: ', e);

                // Forward events to the active pane
                if (this.activePane &&
                    this.activePane.keydown)
                    this.activePane.keydown(e);
            },

            keyup: function(e) {
                debug('keyup event: ', e);

                // Forward events to the active pane
                if (this.activePane &&
                    this.activePane.keyup)
                    this.activePane.keyup(e);
            },

            mousedown: function(e) {
                debug('mousedown event: ', e);

                // Forward events to the active pane
                if (this.activePane &&
                    this.activePane.mousedown)
                    this.activePane.mousedown(e);
            },

            mouseup: function(e) {
                debug('mouseup event: ', e);

                // Forward events to the active pane
                if (this.activePane &&
                    this.activePane.mouseup)
                    this.activePane.mouseup(e);
            },

            contextMenuHandler: function(e) {
                debug('contextMenu event: ', e);

                // Forward events to the active pane
                if (this.activePane &&
                    this.activePane.contextMenuHandler)
                    this.activePane.contextMenuHandler(e);
            },
        }
    });
};
