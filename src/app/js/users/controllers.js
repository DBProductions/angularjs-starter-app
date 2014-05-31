/**
 * @module Project controller
 **/
'use strict';
angular.module('app.controllers')
/**
 * List controller
 * list all applications
 *
 * @class ListCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} $location
 * @param {Object} User
 */ 
.controller('UsersCtrl', ['$scope', '$routeParams', '$location', 'User', function($scope, $routeParams, $location, User) {
    $scope.pageSize = 6;
    $scope.currentPage = parseInt($routeParams.currentPage, 10) || 0;
    User.get().success(function (response) {
        $scope.users = response;
        $scope.numberOfPages = function numberOfPages() {
            return Math.ceil($scope.users.length / $scope.pageSize);
        };
    });
    $scope.edit = function edit(user) {
        $location.path('/edituser/' + user._id);
    };
    $scope.query = {};
    $scope.queryBy = 'email';
    $scope.orderProp = 'email';
}])
/**
 * Detail controller
 *
 * @class DetailCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} $location
 * @param {Object} User
 */
.controller('UserDetailCtrl', ['$scope', '$routeParams', '$location', 'User', function($scope, $routeParams, $location, User) {
    $scope.currentPage = $routeParams.currentPage;
    User.get($routeParams.userId).success(function (response) {
        $scope.user = response;
    });
    $scope.edit = function edit(user) {
        $location.path('/edituser/' + user._id);
    };
    $scope.del = function del(user) {
        User.del(user._id).success(function (response) {
            $location.path('/users');
        });
    };
}])
/**
 * Add controller
 * apps a new application
 *
 * @class AddCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $http
 * @param {Object} $location
 * @param {Object} $filter
 */
.controller('UserAddCtrl', ['$scope', '$http', '$location', '$filter', 'User', function($scope, $http, $location, $filter, User) {
    /**
     * submit the form
     *
     * @method submitForm
     */
    $scope.submitForm = function submitForm() {
        if ($scope.user) {            
            User.post($scope.user).success(function(response) {
                $scope.user = {};
                $location.path('/users');
            });
        }
    };
}])
/**
 * Edit controller
 * edit a application
 *
 * @class EditCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} $http
 * @param {Object} $filter
 * @param {Object} Application
 */
.controller('UserEditCtrl', ['$scope', '$routeParams', '$http', '$location', '$filter', 'User', function($scope, $routeParams, $http, $location, $filter, User) {
    User.get($routeParams.userId).success(function(response) {
        $scope.user = response;
    });
    /**
     * submit the form
     *
     * @method submitForm
     */
    $scope.submitForm = function submitForm() {
        if ($scope.user) {
            User.put($routeParams.userId, $scope.user).success(function(response) {
                $scope.user = {};
                $location.path('/users/' + $routeParams.userId);
            });
        }
    };
}]);