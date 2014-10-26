/**
 *
 */
describe('angularjs project', function() {
    /**
     *
     */
    var ptor;
    beforeEach(function() {
        ptor = protractor.getInstance();
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
        age.sendKeys('48');
        insertBtn.click();

        var users = element.all(by.repeater('user in users'));

        expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users');
        expect(users.count()).toEqual(4);
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

        expect(editBtn.isPresent()).toBe(true);
        expect(deleteBtn.isPresent()).toBe(true);
        expect(user.getText()).toEqual('test@test.com');
        expect(age.getText()).toEqual('48');
    });

    /**
     *
     */
    it('should go from detail page to edit page and back after sending', function() {
        browser.get('http://localhost:3000/#/users/4');

        var editBtn = element(by.id('editBtn'));

        editBtn.click();

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

        editSendBtn.click();

        expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users/4');

        var _user = element(by.binding('{{user.email}}'));
        var _age = element(by.binding('{{user.age}}'));
        expect(_user.getText()).toEqual('test@test.org');
        expect(_age.getText()).toEqual('42');
    });

    /**
     *
     */
    it('should go from detail page to list page after deleting', function() {
        browser.get('http://localhost:3000/#/users/4');
        var deleteBtn = element(by.id('deleteBtn'));
        var user = element(by.binding('{{user.email}}'));
        var age = element(by.binding('{{user.age}}'));

        expect(user.getText()).toEqual('test@test.org');
        expect(age.getText()).toEqual('42');

        deleteBtn.click();

        expect(ptor.getCurrentUrl()).toEqual('http://localhost:3000/#/users');
    });
});