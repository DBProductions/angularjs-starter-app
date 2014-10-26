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
        var location, routeParams, callSucceed, userService;
        beforeEach(inject(function($injector, User, $q) {
            location = $injector.get('$location');
            routeParams = {};
            userService = User;
            spyOn(userService, "get").andCallFake(function(){
                if (callSucceed) {
                    return $q.when([{"_id": 1, "email": "a@abc.com"},{"_id": 2, "email": "b@def.com"}]);
                } else {
                    return $q.reject("Something went wrong");
                }
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

        describe('User List Controller', function() {
            var UserListCtrl;

            it('should have all properties like defined', inject(function($controller) {
                UserListCtrl = $controller('UserListCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
                expect($scope.query).toEqual({});
                expect($scope.queryBy).toEqual('email');
                expect($scope.orderProp).toEqual('email');
                expect(typeof $scope.edit).toEqual('function');
            }));

            it('should end on right location when edit gets executed', inject(function($controller) {
                UserListCtrl = $controller('UserListCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
                $scope.edit({_id: 1});
                expect(location.path()).toBe('/edituser/1');    
            }));

            it('should load data like expected', inject(function($controller) {
                callSucceed = true;
                UserListCtrl = $controller('UserListCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
                $scope.$digest();
                expect(userService.get).toHaveBeenCalled();
                expect($scope.users.length).toEqual(2);
            }));

            it('should be like expected when no data can loaded', inject(function($controller) {
                callSucceed = false;
                UserListCtrl = $controller('UserListCtrl', { $scope: $scope, $routeParams: routeParams, $location: location, User: userService });
                $scope.$digest();
                expect(userService.get).toHaveBeenCalled();
                expect($scope.users.length).toEqual(0);
            }));            
        });

        describe('User Detail Controller', function() {
            it('should have properties and methods like expected', inject(function($controller) {
                routeParams.userId = 1;
                callSucceed = true;
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
        });

        describe('User Add Controller', function() {
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
        });

        describe('User Edit Controller', function() {
            it('should have properties and methods like expected', inject(function($controller) {
                routeParams.userId = 1;
                callSucceed = true;
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
});