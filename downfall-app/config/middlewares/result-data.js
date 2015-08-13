/**
 * Result Data
 * Adds data to be returned by the result
 */

var md5 = require(_root + '/lib/md5'),
    version = require(_root + '/package.json').version,
    versionHash = md5(version).slice(0,8);

module.exports = function(req, res, next) {

    'use strict';

    if (!res.data) res.data = {};

    var render = res.render;
    res.render = function r(view, locals, cb) {
        if (locals)
            for (var prop in locals)
                res.data[prop] = locals[prop];

        return render.apply(res, [view, res.data, cb]);
    };

    // Defaults
    res.data.layout = 'layouts/main';
    res.data.ver = versionHash;

    next();
};
