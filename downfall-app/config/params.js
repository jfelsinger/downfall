'use strict';

/**
 * Params
 * Automagically add parameters to the request
 */

var debug = require('debug')('downfall:config:params'),
    chalk = require('chalk'),
    getById = require(_root + '/lib/get-by-id');

module.exports = function(router, mongoose) {

    [
        // { name:'account',   model: 'Account' },
        // { name:'act',       model: 'Activity' },
    ].forEach(function(row) {

        router.param(row.name + 'Id', function(req, res, next, id) {
            debug('getting: %s: ' + chalk.cyan('%s'), row.name, id);

            var Model = mongoose.model(row.model),
                query = getById(id, req, Model, mongoose);

            query
                .execAsync()
                .then(function(obj) {
                    // Add result to the request

                    if (!obj) {
                        capture.error('Failed to load %s: ' + chalk.cyan('%s'), row.name, id);

                        return res.status(404).json({
                            code: '001404',
                            message: req.__('error.001404.message'),
                            description: req.__('error.001404.description'),
                            id: id
                        });
                    }

                    req[row.name] = obj;
                    next();
                })
                .catch(function(err) {
                    capture.error(err);
                    return next(err);
                });


        });

    });

};
