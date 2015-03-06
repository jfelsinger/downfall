'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-game');

var Vue = require('vue');

module.exports = Vue.component('pane-game', {
    template: '#vue-tmpl__pane-game',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
