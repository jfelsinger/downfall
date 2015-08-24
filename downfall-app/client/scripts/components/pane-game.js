'use strict';
/* jslint browser:true */

var debug = require('debug')('downfall:cmpt:pane-game');

var Vue = require('vue');

window.components.paneGame =
module.exports = 
Vue.extend({
    template: '#vue-tmpl__pane-game',

    data: function() {
        return {
        };
    },

    created: function() {
        debug('created');
    },
});
