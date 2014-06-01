/**
 * @module Controller
 **/
'use strict';
angular.module('app.controllers')
/**
 * User list controller
 * list all users
 *
 * @class UserListCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $location
 * @param {Object} User
 */ 
.controller('UserListCtrl', ['$scope', '$routeParams', '$location', 'User', function($scope, $routeParams, $location, User) {
    User.get().success(function (response) {
        $scope.users = response;
    });
    /**
     * @method edit
     */
    $scope.edit = function edit(user) {
        $location.path('/edituser/' + user._id);
    };
    $scope.query = {};
    $scope.queryBy = 'email';
    $scope.orderProp = 'email';
}])
/**
 * User detail controller
 *
 * @class UserDetailCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} $location
 * @param {Object} User
 */
.controller('UserDetailCtrl', ['$scope', '$routeParams', '$location', 'User', function($scope, $routeParams, $location, User) {
    User.get($routeParams.userId).success(function (response) {
        $scope.user = response;
    });
    /**
     * @method edit
     */
    $scope.edit = function edit(user) {
        $location.path('/edituser/' + user._id);
    };
    /**
     * @method del
     */
    $scope.del = function del(user) {
        User.del(user._id).success(function (response) {
            $location.path('/users');
        });
    };
}])
/**
 * User add controller
 * add a new user
 *
 * @class UserAddCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $location
 * @param {Object} $filter
 * @param {Object} User
 */
.controller('UserAddCtrl', ['$scope', '$location', '$filter', 'User', function($scope, $location, $filter, User) {
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
 * User edit controller
 * edit a user
 *
 * @class UserEditCtrl
 * @constructor
 * @param {Object} $scope
 * @param {Object} $routeParams
 * @param {Object} $filter
 * @param {Object} User
 */
.controller('UserEditCtrl', ['$scope', '$routeParams', '$location', '$filter', 'User', function($scope, $routeParams, $location, $filter, User) {
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