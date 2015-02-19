/**
 * Data/Page
 * Adds page data to the result
 */
module.exports = function(req, res, next) {

    'use strict';

    // Default page data
    res.data.page = {
        title: req.__('page.default.title'),
        description: req.__('page.default.description'),
        scripts: [],
        styles: [],
        templates: [],
    };

    res.includeTemplate = function includeTemplate() {
        for (var i = 0; i < arguments.length; i++) {
            var tmpl = arguments[i];

            // Teim the file extension
            if (/.html$/.test(tmpl))
                tmpl = tmpl.slice(0, -5);
            else if (/.md$/.test(tmpl))
                tmpl = tmpl.slice(0, -3);

            res.data.page.templates.push(tmpl);
        }
    };

    /**
     * Include script(s) on the page
     */
    res.includeScript = function includeScript() {
        for (var i = 0; i < arguments.length; i++) {
            var script = arguments[i];

            // Trim the file extension
            if (/.js$/.test(script))
                script = script.slice(0,-3);

            res.data.page.scripts.push(script);
        }
    };

    /**
     * Include style(s) on the page
     */
    res.includeStyle = function includeStyle() {
        for (var i = 0; i < arguments.length; i++) {
            var style = arguments[i];

            // Trim the file extension
            if (/.css$/.test(style))
                style = style.slice(0,-4);

            res.data.page.styles.push(style);
        }
    };

    next();
};
