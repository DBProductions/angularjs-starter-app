/**
 * @module Test
 */
'use strict';
/**
 * test the directives
 * @class directivesSpec
 */
describe('Directives', function() {          
    beforeEach(module('app.directives'));

    /**
     * test the appVersion directive
     * @method app-versionSpec
     */
    describe('app-version', function() {
        it('should print current version', function() {
            module(function($provide) {
                $provide.value('version', 'TEST_VER');
            });
            inject(function($compile, $rootScope) {
                var element = $compile('<span app-version></span>')($rootScope);
                expect(element.text()).toEqual('TEST_VER');
            });
        });
    });
});