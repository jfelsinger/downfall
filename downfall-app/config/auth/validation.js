'use strict';

var debug = require('debug')('subtasker:config:auth:validation');

var authHelpers = require(_root + '/lib/auth-helpers')(debug),
    BPromise = require('bluebird');

module.exports.login =
function(req, res, next) {
    BPromise
        .resolve(req)
        .then(authHelpers.checkFor.inRequest.username)
        .then(authHelpers.checkFor.inRequest.password)
        .then(function() { next(); })
        .catch(next);
};

module.exports.register =
function(req, res, next) {
    BPromise
        .resolve(req)
        .then(authHelpers.checkFor.inRequest.username)
        .then(authHelpers.checkFor.inRequest.password)
        .then(function() { next(); })
        .catch(next);
};

module.exports.facebook =
function(req, res, next) {
    BPromise
        .resolve(req)
        .then(authHelpers.checkFor.inRequest.facebookToken)
        .then(function() { next(); })
        .catch(next);
};
