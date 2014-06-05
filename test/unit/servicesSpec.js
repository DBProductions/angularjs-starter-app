/**
 * @module Test
 */
'use strict';
/**
 *
 */
describe('Services', function() {          
    beforeEach(module('app.services'));

    describe('Common service', function() {
        it('should have version property', inject(function(version) {
            expect(version).toBe('0.0.1');
        }));
    });

    describe('User service', function() {
        var $httpBackend;
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have get method and work as expected', inject(function(User) {
            $httpBackend.expect('GET', '/users').respond([{"_id": 1, "email": "a@abc.com"},{"_id": 2, "email": "b@def.com"}]);
            User.get().success(function (response) {
                expect(response).toEqual([{'_id': 1, 'email': 'a@abc.com'},{'_id': 2, 'email': 'b@def.com'}]);
            });
            $httpBackend.flush();
        }));

        it('should have get method and work as expected', inject(function(User) {
            $httpBackend.expect('GET', '/users/1').respond({"_id": 1, "email": "a@abc.com"});
            User.get(1).success(function (response) {
                expect(response).toEqual({"_id": 1, "email": "a@abc.com"});
            });
            $httpBackend.flush();
        }));

        it('should have post method and work as expected', inject(function(User) {
            $httpBackend.expect('POST', '/users').respond(true);
            User.post({"_id": 2, "email": "b@def.com"}).success(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

        it('should have put method and work as expected', inject(function(User) {
            $httpBackend.expect('PUT', '/users/1').respond(true);
            User.put(1, {"_id": 2, "email": "b@def.com"}).success(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

        it('should have delete method and work as expected', inject(function(User) {
            $httpBackend.expect('DELETE', '/users/1').respond(true);
            User.del(1).success(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

    });
});