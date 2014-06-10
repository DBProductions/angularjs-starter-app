/**
 * @module Test
 */
'use strict';
/**
 * @class controllersSpec
 */ 
describe('Controllers', function() {
	beforeEach(module('app.services'));
    beforeEach(module('app.controllers'));

    var $scope;
    beforeEach(inject(function($rootScope) {
        $scope = $rootScope.$new();
    }));
    /**
     * test the common controllers
     */
    describe('Home Controller', function() {
        var controller;
        beforeEach(inject(function($controller) {
            controller = $controller('HomeCtrl', { $scope: $scope });
        }));

        it('should be defined', function() {
            expect(controller).toBeDefined();
        });
    });
    /**
     * test the user specific controllers
     */
    describe('Users Controllers', function() {   
        var location, routeParams, succeedPromise, userService;
        beforeEach(inject(function($injector, User, $q) {
            location = $injector.get('$location');
            routeParams = {};
            userService = User;
            spyOn(userService, "get").andCallFake(function(){
                return $q.when([{"_id": 1, "email": "a@abc.com"},{"_id": 2, "email": "b@def.com"}]);
            });
            spyOn(User, "post").andCallFake(function(){
                return $q.when({"_id": 1, "email": "a@abc.com"});
            });
            spyOn(User, "put").andCallFake(function(){
                return $q.when({"_id": 1, "email": "a@abc.com"});
            });
            spyOn(userService, "del").andCallFake(function(){
                return $q.when({"_id": 1, "email": "a@abc.com"});
            });
        }));

        it('should have properties and methods like expected', inject(function($controller) {
            var UserListCtrl = $controller('UserListCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
            $scope.$digest();

            expect($scope.query).toEqual({});
            expect($scope.queryBy).toEqual('email');
            expect($scope.orderProp).toEqual('email');
            expect(userService.get).toHaveBeenCalled();
            expect($scope.users).toBeDefined();
            expect($scope.users.length).toEqual(2);

            expect(typeof $scope.edit).toEqual('function');
            $scope.edit({_id: 1});
            expect(location.path()).toBe('/edituser/1');
        }));

        it('should have properties and methods like expected', inject(function($controller) {
            routeParams.userId = 1;
            var UserDetailCtrl = $controller('UserDetailCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
            $scope.$digest();

            expect($scope.user).toBeDefined();
            expect(typeof $scope.edit).toEqual('function');

            $scope.edit({_id: 1});
            expect(location.path()).toBe('/edituser/1');

            expect(typeof $scope.del).toEqual('function');
            $scope.del({_id: 1});
            $scope.$digest();
            expect(userService.del).toHaveBeenCalled();
            expect(location.path()).toBe('/users');
        }));

        it('should have properties and methods like expected', inject(function($controller) {               
            var UserAddCtrl = $controller('UserAddCtrl', { $scope: $scope, $location: location, $filter: {}, User: userService });

            expect(typeof $scope.submitForm).toEqual('function');
            $scope.submitForm();
            $scope.user = {_id: 1};
            $scope.submitForm();
            $scope.$digest();
            expect(userService.post).toHaveBeenCalled();
            expect($scope.user).toEqual({});
            expect(location.path()).toBe('/users');
        }));

        it('should have properties and methods like expected', inject(function($controller) {
            routeParams.userId = 1;
            var UserEditCtrl = $controller('UserEditCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, $filter: {}, User: userService });

            expect(typeof $scope.submitForm).toEqual('function');
            $scope.submitForm();
            $scope.user = {_id: 1};
            $scope.submitForm();
            $scope.$digest();
            expect(userService.get).toHaveBeenCalled();
            expect(userService.put).toHaveBeenCalled();
            expect($scope.user).toEqual({});
            expect(location.path()).toBe('/users/1');
        }));
    });
});