'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-settings');

var Vue = require('vue');

module.exports = Vue.component('pane-settings', {
    template: '#vue-tmpl__pane-settings',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
