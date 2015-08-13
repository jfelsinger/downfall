'use strict';

module.exports = function(err, req, res, next) {
    // If page not found continue to the
    // 404 handling middleware
    if (err.message && err.message.indexOf('not found') !== -1) return next(err);

    // log
    capture.error(err);

    // send response
    if (req.isHtml)
        res.status(500)
           .render('500.html', { layout: 'layouts/error' });
    else
        res.status(500).json({
            code: 500,
            message: err.message,
            stack: err.stack,
        });
};
