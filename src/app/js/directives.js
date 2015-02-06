/** 
 * @module Directives 
 */
'use strict';
angular.module('app.directives', [])
/**
 * app-version directive
 *
 * @class appVersion
 * @constructor
 * @param {String} version
 */
.directive('appVersion', [ 'version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
} ]);
