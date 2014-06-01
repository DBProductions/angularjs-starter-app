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
        it('should ', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();
            var UserListCtrl = $controller('UserListCtrl', { $scope: scope, $routeParams: {}, $location: {} });

            expect(UserListCtrl).toBeDefined();
            expect(scope.query).toEqual({});
            expect(scope.queryBy).toEqual('email');
            expect(scope.orderProp).toEqual('email');        
        }));
    });
});