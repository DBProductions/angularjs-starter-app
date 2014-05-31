'use strict';
/**
 *
 */ 
describe('Controllers', function() {
	beforeEach(module('app.services'));
    beforeEach(module('app.controllers'));

    describe('Users Controller', function() {
        it('should ....', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();
            var UsersCtrl = $controller('UsersCtrl', { $scope: scope, $routeParams: {}, $location: {} });

            expect(UsersCtrl).toBeDefined();
            expect(scope.pageSize).toEqual(6);
            expect(scope.query).toEqual({});
            expect(scope.queryBy).toEqual('email');
            expect(scope.orderProp).toEqual('email');        
        }));
    });
});