'use strict';

var chalk = require('chalk');
var BPromise = require('bluebird'),
    jsonPatch = require('fast-json-patch');


var Envelope = require('./envelope'),
    includeFlags = require('./include-flags'),
    listQuery = require('./list-query');

module.exports = function(mongoose, debug) {
    mongoose = mongoose || require('mongoose');
    debug = debug || require('debug')('downfall:api');
    var results = {};

    var rest = results.rest = {};

    rest.respondWith = {
        getAllResponse: function(req, res, name) {
            return function(objects) {
                debug('got ' + name + ': %s', objects.length);

                debug('objecs:', objects);

                if (req.query.includeFlags && objects.map) {
                    var promises = objects.map(function(obj) {
                        return includeFlags(req, obj);
                    });

                    BPromise
                        .all(promises)
                        .then(function(objects) {
                            if (req.query.envelope)
                                objects = new Envelope(objects);

                            res.json(objects);
                        });
                } else {
                    if (req.query.envelope)
                        objects = new Envelope(objects);

                    res.json(objects);
                }
            };
        },

        postResponse: function(req, res, name) {
            return function(object) {
                // save is sometimes giving an array, make sure that we're giving
                // the correct element (the first one)
                if (Array.isArray(object)) object = object[0];

                // Make sure to set header with the location to access the new doc
                var loc = '/api/' + name + '/' + object._id;
                res.location(loc);

                if (req.query.envelope) {
                    object = new Envelope(object, 201);
                    object.fields.location = loc;
                }

                res.status(201).json(object);
            };
        },

        putResponse: function(req, res) {
            return function(object) {
                // save is sometimes giving an array, make sure that we're giving
                // the correct element (the first one)
                if (Array.isArray(object)) object = object[0];

                debug('put object: ' + chalk.cyan('%s'), object._id);

                if (req.query.envelope)
                    object = new Envelope(object);
                res.json(object);
            };
        },

        patchResponse: function(req, res) {
            return function(object) {
                // save is sometimes giving an array, make sure that we're giving
                // the correct element (the first one)
                if (Array.isArray(object)) object = object[0];

                debug('patched object: ' + chalk.cyan('%s'), object._id);

                if (req.query.envelope)
                    object = new Envelope(object);
                res.json(object);
            };
        },

        deleteResponse: function(req, res, model) {
            return function() {
                debug('deleted object: ' + chalk.cyan('%s'), model._id);

                res.status(204).send();
            };
        },
    };

    rest.base = {
        /**
         * Get Many:
         * Return a set of data from an endpoint
         */
        getAll: function(Model, name) {
            return function(req, res, next) {
                var query = Model.find();

                if (req.project) {
                    query = query.where({ project: req.project });
                }

                query = listQuery(query, req, debug);

                query
                    .execAsync()
                    .then(rest.respondWith.getAllResponse(req, res, name))
                    .catch(next);

            };
        },

        /**
         * POST:
         * Create a new object and give it an endpoint
         */
        post: function(Model, name) {
            return function(req, res, next) {
                var model = new Model(req.body);
                model.
                    saveAsync()
                    .then(rest.respondWith.postResponse(req, res, name))
                    .catch(next);
            };
        },

        /**
         * GET:
         * Return the data that is at the endpoint
         */
        get: function(model) {
            return function(req, res, next) {
                if (model.toObject)
                    model = model.toObject();

                if (req.query.envelope)
                    model = new Envelope(model);

                if (req.query.includeFlags) {
                    includeFlags(req, model)
                        .then(function(model) {
                            res.json(model);
                        })
                        .catch(next);
                } else {
                    res.json(model);
                }
            };
        },

        /**
         * PUT:
         * Replace the object that is stored at an endpoint with the request data
         */
        put: function(Model, model) {
            return function(req, res, next) {
                var patch = jsonPatch.compare(model.toObject(), req.body);
                jsonPatch.apply(model, patch);

                model
                    .saveAsync()
                    .then(rest.respondWith.patchResponse(req,res))
                    .catch(next);
            };
        },

        /**
         * PATCH:
         * Patch an object with requested data, follows rfc standard for
         * json patching,
         *
         * http://jsonpatch.com/
         * https://www.npmjs.com/package/fast-json-patch
         */
        patch: function(model) {
            return function(req, res, next) {
                jsonPatch.apply(model, req.body);

                model
                    .saveAsync()
                    .then(rest.respondWith.patchResponse(req,res))
                    .catch(next);
            };
        },

        /**
         * DELETE:
         * Remove the object that is at the endpoint
         */
        delete: function(model) {
            return function(req, res, next) {
                model
                    .removeAsync()
                    .then(rest.respondWith.deleteResponse(req,res,model))
                    .catch(next);
            };
        },
    };

    return results;
};

