'use strict';

module.exports = function(err, req, res, next) {
    // send response
    if (req.isHtml)
        res.status(404)
           .render('404.html', { layout: 'layouts/error' });
    else
        res.status(404).json({
            code: 404,
            message: 'Not Found'
        });
};
