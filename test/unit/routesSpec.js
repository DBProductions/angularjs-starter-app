'use strict';
/**
 *
 */
describe('Testing routes', function() {
    beforeEach(module('app'));

    it('should load the start page on successful load', function() {
        inject(function($route) {
            expect($route.routes['/home'].controller).toBe('HomeCtrl');
            expect($route.routes['/users'].controller).toBe('UsersCtrl');
            expect($route.routes['/users/:userId'].controller).toBe('UserDetailCtrl');
        });
    });
});