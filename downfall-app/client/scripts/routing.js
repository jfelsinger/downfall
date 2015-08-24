/**
 * Setup routing
 */

var Vue = require('vue'),
    VueRouter = require('vue-router');

Vue.use(VueRouter);

var app = require('./view-models/app'),
    router = new VueRouter({
        abstract: true // Who's Vue is it anyway, 
                       // Where the pages are made-up and the urls don't matter
    });

router.map({
    '/':            { component: require('./components/pane-home') },
    '/game':        { component: require('./components/pane-game') },
    '/servers':     { component: require('./components/pane-servers') },
    '/settings':    { component: require('./components/pane-settings') },
});

router.alias({
    '/':'/home',
});

// Start the app!
router.start(app, '#app');
