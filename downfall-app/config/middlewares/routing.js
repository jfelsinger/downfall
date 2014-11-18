/**
 * Routing
 * Setup request routing
 */

module.exports = function(app, passport) {

    // Routes handling authorization
    require('../routes/auth')(app, passport);

    // Routes handling api requests
    require('../routes/api')(app);

};
