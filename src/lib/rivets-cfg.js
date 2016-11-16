define([
    'rivets',
    'underscore',
    'jquery',

    'rivets-backbone-adapter'
], function (rivets, _, $) {
    'use strict';

    /* Make sure Array.isArray is available (should be). */
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return _.isArray(arg);
        };
    }

    /* === Objects === */

    rivets.formatters.defined = function (value) {
        return !_.isUndefined(value) && !_.isNull(value);
    };

    var emptyAsDefault = function (obj) {
        return rivets.formatters.defined(obj) ? obj : '';
    };

    rivets.formatters.eq = function (value, other) {
        return value === other;
    };

    /* === Arrays === */

    rivets.formatters.join = function (array, separator) {
        return Array.isArray(array) ? array.join(separator) : emptyAsDefault(array);
    };

    rivets.formatters.contains = function (array, needle) {
        return Array.isArray(array) ? _.indexOf(array, needle) > -1 : false;
    };

    rivets.formatters.length = function (array) {
        return Array.isArray(array) ? array.length : 0;
    };

    rivets.formatters.isEmpty = function (array) {
        return rivets.formatters.length(array) === 0;
    };

    /* === String === */

    rivets.formatters.startWithCap = function (string) {
        return _.isString(string) && string.length > 0
            ? string.charAt(0).toUpperCase() + string.substr(1)
            : emptyAsDefault(string);
    };

    /* === Booleans === */

    rivets.formatters.toBoolean = function (value) {
        return Boolean(value);
    };

    rivets.formatters.not = function (value) {
        return !value;
    };

    rivets.formatters.and = function (value, other) {
        return value && other;
    };

    rivets.formatters.or = function (value, other) {
        return value || other;
    };

    rivets.formatters.if = function (test, value1, value2) {
        return test ? value1 : value2;
    };

    /* === Utils === */

    rivets.formatters.map = function (value, map) {
        return value && map ? map[value] || value : emptyAsDefault(value);
    };

    /* === Custom binders === */
    // Provided on https://github.com/mikeric/rivets/wiki/Custom-Binders
    /**
     * Adds a new class to the element (using the attribute value) in addition to any existing ones.
     * On subsequent changes, the previously added class is replaced with the new one.
     *
     * @param {Object} el the element
     * @param {string} value the class to add
     */
    rivets.binders.addclass = function (el, value) {
        if (el.addedClass) {
            $(el).removeClass(el.addedClass);
            delete el.addedClass;
        }

        if (value) {
            $(el).addClass(value);
            el.addedClass = value;
        }
    };

    return rivets;
});
