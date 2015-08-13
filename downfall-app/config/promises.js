'use strict';

/**
 * Setup Promises!
 */

var BPromise = require('bluebird');

BPromise.promisifyAll(require('mongoose'));
BPromise.promisifyAll(require('jsonwebtoken'));
