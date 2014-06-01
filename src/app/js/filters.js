/**
 * @module Filters
 */
'use strict';
angular.module('app.filters', [])
/**
 * interpolate filter
 *
 * @class interpolate
 * @constructor
 * @param {String} version
 */
.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);