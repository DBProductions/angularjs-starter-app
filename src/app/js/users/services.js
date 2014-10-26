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
 * @param {Object} $http
 * @param {Object} $q
 * @return {Object} userService
 */
.factory('User', ['$http', '$q', function($http, $q) {
    return {
        /**
         * @method get
         * @param {String} id
         * @return {Object} $q.promise
         */
        get: function get(id) {
            var deferred = $q.defer();
            var url = '/users';
            if (id) {
                url += '/' + id;
            }
            $http.get(url).success(function(response) {
                deferred.resolve(response);
            }).error(function(data, status, headers, config) {
                deferred.reject({data: data, status: status, headers: headers, config: config});
            });
            return deferred.promise;
        },
        /**
         * @method post
         * @param {Object} data
         * @return {Object} $q.promise
         */
        post: function post(data) {
            var deferred = $q.defer();
            $http.post('/users', data).success(function(response) {
                deferred.resolve(response);
            }).error(function(data, status, headers, config) {
                deferred.reject({data: data, status: status, headers: headers, config: config});
            });
            return deferred.promise;
        },
        /**
         * @method put
         * @param {String} id
         * @param {Object} data
         * @return {Object} $q.promise
         */
        put: function put(id, data) {
            var deferred = $q.defer();
            $http.put('/users/' + id, data).success(function(response) {
                deferred.resolve(response);
            }).error(function(data, status, headers, config) {
                deferred.reject({data: data, status: status, headers: headers, config: config});
            });
            return deferred.promise;
        },
        /**
         * @method del
         * @param {String} id
         * @return {Object} $q.promise
         */
        del: function del(id) {
            var deferred = $q.defer();
            $http.delete('/users/' + id).success(function(response) {
                deferred.resolve(response);
            }).error(function(data, status, headers, config) {
                deferred.reject({data: data, status: status, headers: headers, config: config});
            });
            return deferred.promise;
        }
    };
}]);