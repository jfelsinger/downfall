'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-servers');

var Vue = require('vue');

window.components.paneServers =
module.exports = 
Vue.extend({
    template: '#vue-tmpl__pane-servers',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
