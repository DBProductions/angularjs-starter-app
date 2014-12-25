var fs = require('fs');

describe('angularjs-starter-app end to end testing', function() {
    /**
     *
     */
    var ptor;
    beforeEach(function() {
        ptor = protractor.getInstance();
    });
    afterEach(function () {
        var currentSpec = jasmine.getEnv().currentSpec,
            passed = currentSpec.results().passed();

        browser.takeScreenshot().then(function (png) {
            browser.getCapabilities().then(function (capabilities) {
                var browserName = capabilities.caps_.browserName,
                    passFail = (passed) ? 'pass' : 'FAIL',
                    filename = browserName + '_' + passFail + '-' + currentSpec.description.split(" ").join("_") + '.png';
                var stream = fs.createWriteStream('test/e2e/screenshots/' + filename);
                stream.write(new Buffer(png, 'base64'));
                stream.end();
            });
        });
    });
    /**
     *
     */
    it('should add a new user', function() {
        browser.get('http://localhost:3000/#/insertuser');
        var email = element(by.model('user.email'));
        var age = element(by.model('user.age'));
        var insertBtn = element(by.id('insertBtn'));

        email.sendKeys('test@test.com');
        ptor.findElements(protractor.By.model('user.gender')).then(function(models){
            models[0].click();
        });
        age.sendKeys('48');        
        insertBtn.click().then(function() {
            var users = element.all(by.repeater('user in users'));

            expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users');
            expect(users.count()).toEqual(4);
        });
    });
    /**
     *
     */
    it('should show the user details', function() {
        browser.get('http://localhost:3000/#/users/4');

        var editBtn = element(by.id('editBtn'));
        var deleteBtn = element(by.id('deleteBtn'));
        var user = element(by.binding('{{user.email}}'));
        var age = element(by.binding('{{user.age}}'));
        var gender = element(by.binding('{{user.gender}}'));

        expect(editBtn.isPresent()).toBe(true);
        expect(deleteBtn.isPresent()).toBe(true);
        expect(user.getText()).toEqual('test@test.com');
        expect(age.getText()).toEqual('48');
        expect(gender.getText()).toEqual('female');
    });

    /**
     *
     */
    it('should go from detail page to edit page and back after sending', function() {
        browser.get('http://localhost:3000/#/users/4');

        var editBtn = element(by.id('editBtn'));

        editBtn.click().then(function() {

            expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/edituser/4');

            var email = element(by.model('user.email'));
            var age = element(by.model('user.age'));
            var editSendBtn = element(by.id('editBtn'));

            expect(email.isPresent()).toBe(true);
            expect(age.isPresent()).toBe(true);
            expect(email.getAttribute('value')).toEqual('test@test.com');
            expect(age.getAttribute('value')).toEqual('48');

            email.clear();
            email.sendKeys('test@test.org');
            age.clear();
            age.sendKeys('42');

            ptor.findElements(protractor.By.model('user.gender')).then(function(models){
                expect(models[0].getAttribute('value')).toEqual('female');
            });

            editSendBtn.click().then(function() {
                expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users/4');

                var _user = element(by.binding('{{user.email}}'));
                var _age = element(by.binding('{{user.age}}'));
                expect(_user.getText()).toEqual('test@test.org');
                expect(_age.getText()).toEqual('42');
            });
        });
    });

    /**
     *
     */
    it('should go from detail page to list page after deleting', function() {
        browser.get('http://localhost:3000/#/users/4');
        var deleteBtn = element(by.id('deleteBtn'));
        var user = element(by.binding('{{user.email}}'));
        var age = element(by.binding('{{user.age}}'));
        var gender = element(by.binding('{{user.gender}}'));

        expect(user.getText()).toEqual('test@test.org');
        expect(age.getText()).toEqual('42');
        expect(gender.getText()).toEqual('female');

        deleteBtn.click().then(function() {
            expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users');
        });
    });
});