'use strict';

var // mongoose = require('mongoose'),
    BPromise = require('bluebird');

var Envelope = require('./envelope');

/**
 * Add flags to a model
 */
module.exports = BPromise.method(function IncludeFlags(req, val) {
    if (val.toObject) val = val.toObject();

    var model = val;

    var flagTarget = val;

    if (model instanceof Envelope) {
        model = model.response;
        flagTarget = model;
    }


    return BPromise.all([
        ])
        .spread(function() {
            return val;
        });
});

module.exports.many = function(req) {
    return BPromise.method(function(objects) {
        if (!req.query.includeFlags || !objects.count)
            return objects;
        // else:

        return BPromise.all(objects.map(function(obj) {
            return module.exports(req, obj);
        }));
    });
};

module.exports.one = function(req) {
    return BPromise.method(function(object) {
        if (!req.query.includeFlags)
            return object;
        // else:

        return module.exports(req, object);
    });
};
