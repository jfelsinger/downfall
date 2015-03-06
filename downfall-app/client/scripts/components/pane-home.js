'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-home');

var Vue = require('vue');

module.exports = Vue.component('pane-home', {
    template: '#vue-tmpl__pane-home',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
