/**
 * @module Test
 */
'use strict';
/**
 * @class routesSpec
 */
describe('Testing routes', function() {
    beforeEach(module('app'));
    /**
     * test if every route have the right controller defined
     */
    it('should load the start page on successful load', function() {
        inject(function($route) {
            expect($route.routes['/home'].controller).toBe('HomeCtrl');
            expect($route.routes['/users'].controller).toBe('UserListCtrl');
            expect($route.routes['/users/:userId'].controller).toBe('UserDetailCtrl');
        });
    });
});