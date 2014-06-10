/**
 * @module Test
 */
'use strict';
/**
 * @class servicesSpec
 */
describe('Services', function() {          
    beforeEach(module('app.services'));
    /**
     * common service get tested here
     */
    describe('Common service', function() {
        it('should have version property', inject(function(version) {
            expect(version).toBe('0.0.1');
        }));
    });
    /**
     * user specific service get tested here
     */
    describe('User service', function() {
        var $httpBackend;
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have properties and methods like defined', inject(function(User) {
            expect(typeof User).toEqual('object');
            expect(typeof User.get).toEqual('function');
            expect(typeof User.post).toEqual('function');
            expect(typeof User.put).toEqual('function');
            expect(typeof User.del).toEqual('function');
        }));      
        /**
         * test get method of service when be successful and have an error
         */
        it('should have get method and work as expected when http response is successful', inject(function(User) {
            $httpBackend.expect('GET', '/users').respond([{"_id": 1, "email": "a@abc.com"},{"_id": 2, "email": "b@def.com"}]);
            User.get().then(function (response) {
                expect(response).toEqual([{'_id': 1, 'email': 'a@abc.com'},{'_id': 2, 'email': 'b@def.com'}]);
            });
            $httpBackend.flush();
        }));

        it('should have get method and work as expected when http response is wrong', inject(function(User) {
            $httpBackend.expect('GET', '/users').respond(500);
            User.get().then(function (response) {}, function(msg){
                expect(msg).toEqual('service get failed!');
            });
            $httpBackend.flush();
        }));
        /**
         * test get method of service with user id when be successful and have an error
         */
        it('should have get method and work as expected when http response is successful', inject(function(User) {
            $httpBackend.expect('GET', '/users/1').respond({"_id": 1, "email": "a@abc.com"});
            User.get(1).then(function (response) {
                expect(response).toEqual({"_id": 1, "email": "a@abc.com"});
            });
            $httpBackend.flush();
        }));

        it('should have get method and work as expected when http response is wrong', inject(function(User) {
            $httpBackend.expect('GET', '/users/1').respond(500);
            User.get(1).then(function (response) {}, function(msg){
                expect(msg).toEqual('service get failed!');
            });
            $httpBackend.flush();
        }));
        /**
         * test post method of service when be successful and have an error
         */
        it('should have post method and work as expected when http response is successful', inject(function(User) {
            $httpBackend.expect('POST', '/users').respond(true);
            User.post({"_id": 2, "email": "b@def.com"}).then(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

        it('should have post method and work as expected when http response is wrong', inject(function(User) {
            $httpBackend.expect('POST', '/users').respond(500);
            User.post({"_id": 2, "email": "b@def.com"}).then(function (response) {}, function(msg){
                expect(msg).toEqual('service post failed!');
            });
            $httpBackend.flush();
        }));
        /**
         * test put method of service with user id when be successful and have an error
         */ 
        it('should have put method and work as expected when http response is successful', inject(function(User) {
            $httpBackend.expect('PUT', '/users/1').respond(true);
            User.put(1, {"_id": 2, "email": "b@def.com"}).then(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

        it('should have put method and work as expected when http response is wrong', inject(function(User) {
            $httpBackend.expect('PUT', '/users/1').respond(500);
            User.put(1, {"_id": 2, "email": "b@def.com"}).then(function (response) {}, function(msg){
                expect(msg).toEqual('service put failed!');
            });
            $httpBackend.flush();
        }));
        /**
         * test del method of service with user id when be successful and have an error
         */ 
        it('should have delete method and work as expected when http response is successful', inject(function(User) {
            $httpBackend.expect('DELETE', '/users/1').respond(true);
            User.del(1).then(function (response) {
                expect(response).toEqual(true);
            });
            $httpBackend.flush();
        }));

        it('should have delete method and work as expected when http response is wrong', inject(function(User) {
            $httpBackend.expect('DELETE', '/users/1').respond(500);
            User.del(1).then(function (response) {}, function(msg){
                expect(msg).toEqual('service delete failed!');
            });
            $httpBackend.flush();
        }));
    });
});