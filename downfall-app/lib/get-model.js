'use strict';


module.exports = function getModel(id, mongoose, debug) {
    mongoose = mongoose || require('mongoose');
    debug = debug || require('debug')('downfall:lib:get-model');

    var abbr = id.split('::').shift();
    debug('abbr: %s', abbr);

    switch (abbr) {
    }
};
