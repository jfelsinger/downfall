'use strict';

/** 
 * Build a query based on the request params
 */
module.exports = function buildListQuery(query, req, debug, options) {
    // Defaults
    debug = debug || require('debug')('downfall:lib:list-query');
    options = options || {};

    var search =    req.query.search || req.query.q,
        page =      parseInt(req.query.page) || 1,
        limit =     parseInt(req.query.limit),
        include =   req.query.include,
        count =     req.query.count,
        sort =      req.query.sort || '-created',
        select =    req.query.select;

    if (search) {
        var regex = new RegExp(search, 'i');
        query = query.or([
        ]);
    }

    // Only do these operations when we're not dealing with a count request,
    // count requests only return a number, so all of this would be worthless
    // otherwise
    if (!count) {
        if (limit !== 0 || !isNaN(limit)) {
            if (limit < 0 || isNaN(limit)) limit = 12;

            debug('query.limit -> %s', limit);
            debug('query.page  -> %s', page);
            query = query.limit(limit)
                         .skip((page - 1) * limit);
        }

        if (include) {
            var includes = include.split(',');
            includes.forEach(function(include) {
                if (options.includeModel &&
                    options.includeModel[include])
                    query = query.populate(include, null, options.includeModel[include]);
                else
                    query = query.populate(include);
            });
        }

        if (sort) {
            // field,-asc => field -asc
            sort = sort.replace(/,/g, ' ');
            query = query.sort(sort);
        }

        if (select) {
            var selects = select.replace(/,/g, ' ');
            query = query.select(selects);
        }
    }

    // Optional querying options
    if (options) {

        if (options.isRemovedFor) {
            query = query.where({
                is_removed_for : { $not: { $all: options.isRemovedFor } }
            });
        }

        if (options.queryTerms && Array.isArray(options.queryTerms)) {
            options.queryTerms.forEach(function(row) {
                if (!req.query[row.param]) return;

                var values = req.query[row.param];
                query = query.where(row.field).in(values.split(','));
            });
        }
    }

    if (count) {
        query = query.count();
    }

    query = query.where('is_deleted').ne(true);


    return query;
};
