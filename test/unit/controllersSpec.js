/**
 * @module Test
 */
'use strict';
/**
 *
 */ 
describe('Controllers', function() {
	beforeEach(module('app.services'));
    beforeEach(module('app.controllers'));

    describe('Users Controllers', function() {
        
        var scope, $httpBackend, location, routeParams;
        beforeEach(inject(function($injector, $rootScope) {
            scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            location = $injector.get('$location');
            routeParams = {};
        }));

        it('should have properties and methods like expected', inject(function($controller, User) {
            var UserListCtrl = $controller('UserListCtrl', { $scope: scope, $routeParams: routeParams, $location: location, User: User });

            expect(scope.query).toEqual({});
            expect(scope.queryBy).toEqual('email');
            expect(scope.orderProp).toEqual('email');

            expect(typeof scope.edit).toEqual('function');

            scope.edit({_id: 1});

            expect(location.path()).toBe('/edituser/1');
        }));

        it('should have properties and methods like expected', inject(function($controller, User) {
            routeParams.userId = 1;
            var UserDetailCtrl = $controller('UserDetailCtrl', { $scope: scope, $routeParams: routeParams, $location: location, User: User });

            expect(typeof scope.edit).toEqual('function');

            scope.edit({_id: 1});

            expect(location.path()).toBe('/edituser/1');

            expect(typeof scope.del).toEqual('function');

            scope.del({_id: 1});
        }));

        it('should have properties and methods like expected', inject(function($controller, User) {            
            var UserAddCtrl = $controller('UserAddCtrl', { $scope: scope, $location: {}, $filter: {}, User: User });

            expect(typeof scope.submitForm).toEqual('function');
            scope.submitForm();
            scope.user = {_id: 1};
            scope.submitForm();
        }));

        it('should have properties and methods like expected', inject(function($controller, User) {
            var UserEditCtrl = $controller('UserEditCtrl', { $scope: scope, $routeParams: routeParams, $location: location, $filter: {}, User: User });

            expect(typeof scope.submitForm).toEqual('function');
            scope.submitForm();
            scope.user = {_id: 1};
            scope.submitForm();
        }));
    });
});