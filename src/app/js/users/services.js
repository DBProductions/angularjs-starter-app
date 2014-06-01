/**
 * @module Service
 */
'use strict';
angular.module('app.services')
/**
 * User service
 *
 * @class User
 * @constructor
 * @param {Object} $resource
 * @param {Object} $http
 */
.factory('User', ['$resource', '$http', function($resource, $http) {
	var userService = {
        /**
         * @method get
         * @param {String} id
         * @return {Object} $http service
         */
        get: function get(id) {
            var url = '/users';
            if (id) {
                url += '/' + id;
            }
            return $http.get(url);
        },
        /**
         * @method post
         * @param {Object} data
         * @return {Object} $http service
         */
        post: function post(data) {
            return $http.post('/users', data);
        },
        /**
         * @method put
         * @param {String} id
         * @param {Object} data
         * @return {Object} $http service
         */
        put: function put(id, data) {
            return $http.put('/users/' + id, data);
        },
        /**
         * @method del
         * @param {String} id
         * @return {Object} $http service
         */
        del: function del(id) {
            return $http.delete('/users/' + id);
        }
	};
    return userService;
}]);