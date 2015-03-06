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
            pane: 'home'
        },

        ready: function() {
            this.isLoaded = true;
        },
    });
};
