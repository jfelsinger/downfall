'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-home');

var Vue = require('vue');

window.components.paneHome =
module.exports = 
Vue.extend({
    template: '#vue-tmpl__pane-home',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
