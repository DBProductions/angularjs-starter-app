/**
 * @module Test
 */
'use strict';
/**
 * test the filters
 * @class filtersSpec
 */
describe('Filters', function() {          
    beforeEach(module('app.filters'));
    /**
     * test common interpolate method
     * @method interpolateSpec
     */
    describe('interpolate', function() {
        beforeEach(module(function($provide) {
            $provide.value('version', 'TEST_VER');
        }));

        it('should replace VERSION', inject(function(interpolateFilter) {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });
});