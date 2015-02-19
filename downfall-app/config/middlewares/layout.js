/**
 * Layout
 *
 * Choose a default layout for request going through
 * here
 */
module.exports = function layout(layoutName) {

    'use strict';

    return function layoutResponse(req, res, next) {

        res.data.layout = layoutName ? 'layouts/' + layoutName : false;

        next();
    };
};
