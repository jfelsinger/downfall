'use strict';

exports.render = function(req, res, next) {
    res.data.vm = 'index';
    res.render('index.html');
};
