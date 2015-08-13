'use strict';

var getModel = require('./get-model'),
    regex = null; // require('./regex');

/**
 * Common function for getting an object by id
 */
module.exports = function(id, req, Model, mongoose) {
    mongoose = mongoose || require('mongoose');
    if (regex.id.test(id))
        Model = Model || getModel(id, mongoose);

    var query,
        include =   req.query.include,
        select =    req.query.select;


    // If it's an id, use it
    if (regex.id.test(id)) {
        query = Model.findById(id);
    }

    // If the given value is an email and the model
    // has an email field, use it
    else if (Model.schema.paths.email && regex.email.test(id)) {
        query = Model.findOne({ email:id });
    }

    // IF the model has a username field, try that
    else if (Model.schema.paths.username && isNaN(id)) {
        query = Model.findOne({ username:id });
    }

    // Just default back to trying the id
    else {
        query = Model.findById(id);
    }

    query = query.where('is_deleted').ne(true);

    if (include) {
        var includes = include.split(',');
        includes.forEach(function(include) {
            query = query.populate(include);
        });
    }

    if (select) {
        var selects = select.replace(/,/g, ' ');
        query = query.select(selects);
    }

    return query;
};
