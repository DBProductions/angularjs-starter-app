/**
 * angular services are application singletons there is only one instance of a given service per injector
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
 */
.factory('User', ['$resource', '$http', function($resource, $http) {
	var userService = {
        get: function get(id) {
            var url = '/users';
            if (id) {
                url += '/' + id;
            }
            return $http.get(url);
        },
        post: function post(data) {
            return $http.post('/users', data);
        },
        put: function put(id, data) {
            return $http.put('/users/' + id, data);
        },
        del: function del(id) {
            return $http.delete('/users/' + id);
        }
	};
    return userService;
}]);