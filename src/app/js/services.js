/**
 * angular services are application singletons there is only one instance of a given service per injector
 * @module Service
 */
'use strict';
angular.module('app.services', ['ngResource'])
/**
 * App version
 * @property version
 * @type String
 */
.value('version', '0.0.1');
