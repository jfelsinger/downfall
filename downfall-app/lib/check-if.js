'use strict';

var debug = require('debug')('downfall:lib:check-if');

var BPromise = require('bluebird');

function CheckIf() {
    this.checks = [];
    this.catches = [];
}

CheckIf.prototype.is =
CheckIf.prototype.it =
function is() {
    var checks = [];

    Array.prototype.forEach.call(arguments, function(mws) {
        checks.push(mws);
    }.bind(this));

    // Create a new `and` check when no others exist
    if (!this.checks.length) {
        this.checks.push({ and:checks });
    } 
    
    // Add to the last check in the array
    else {
        for (var key in this.checks[this.checks.length - 1]) {
            var arr = this.checks[this.checks.length - 1][key];
            this.checks[this.checks.length - 1][key] = arr.concat(checks);
            break;
        }
    }

    return this;
};

CheckIf.prototype.or =
function or() {
    var checks = [];

    Array.prototype.forEach.call(arguments, function(mws) {
        checks.push(mws);
    }.bind(this));

    this.checks.push({ or:checks });

    return this;
};

CheckIf.prototype.and =
function and() {
    var checks = [];

    Array.prototype.forEach.call(arguments, function(mws) {
        checks.push(mws);
    }.bind(this));

    this.checks.push({ and:checks });

    return this;
};

CheckIf.prototype.mwToPromise =
BPromise.method(function mwToPromise(mw, req, res) {
    return new BPromise(function(resolve, reject) {
        function next(err) {
            debug('mwToPromise:next() -> ', arguments);
            setTimeout(function() {
                if (err) reject(err);
                else resolve();
            }, 0);
        }

        try {
            debug('mw: ', mw);
            mw(req, res, next);
        } catch(e) {
            debug('mwToPromise:error, reject -> ', e);
            reject(e);
        }
    });
});

CheckIf.prototype.check =
BPromise.method(function check(req, res) {
    var me = this;

    function mapToPromise(mw) {
        return me.mwToPromise(mw,req,res);
    }

    function mapChecks(mw) {
        if (!Array.isArray(mw))
            return me.mwToPromise(mw, req, res);

        return BPromise.all(mw.map(mapToPromise));
    }

    var promises = me.checks.map(function(check) {
        for (var key in check) {
            var checks = check[key];
            if (!Array.isArray(checks))
                checks = [checks];

            // Convert any middlewares to promises
            checks = checks.map(mapChecks);

            switch (key) {
                case 'and':
                    return BPromise.all(checks);

                case 'or':
                    return BPromise.any(checks);
            }
        }
    });

    return BPromise.all(promises);
});


CheckIf.prototype.catch =
function catchError() {
    this.catches.push(arguments);
    return this;
};


Object.defineProperty(CheckIf.prototype, 'mw', {
    get: function() {
        var me = this;

        return function(req,res,next) {
            var p = me.check(req, res).then(function() { 
                debug('mw : -> success, calling next');
                next(); 
            });

            me.catches.forEach(function(args) {
                var func = BPromise.method(args[args.length - 1]);
                debug('func():def', func);

                args[args.length - 1] = BPromise.method(function(err) {
                    debug('func():call', func);
                    return func(err, req, res, next);
                });

                p = p.catch.apply(p, args);
            });

            p = p.catch(next);
        };
    }
});


module.exports = CheckIf;

// var authorized = function(role) {
//     return function(req, res, next) {
//     };
// }
// 
// checkIf
//     .is(authorized('admin'))
//     .or(owner('user'))
//     .mw()
