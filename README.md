# AngularJS starter app

Is a simple AngualrJS application, ready to extend.  

jQuery v1.11.0  
jQuery UI v1.10.4  
Twitter Bootstrap v3.1.1  
Font Awesome v4.0.3  
Angular v1.2.15  


## Getting started

There is a simple server to use the project, run with node.  
The server holds some simple user data and can create, edit and delete, there is no persistence.

    $ node server.js  
    Server listen on port 3000 browse http://127.0.0.1:3000

## Grunt

As default there are two tasks defined, jshint and jasmine.

    $ grunt

## Karma

    $ grunt karma

## Protractor

Start the server and a standalone selenium server before you can run the end to end tests.

    $ webdriver-manager start

Run end to end tests with protractor.

    $ protractor config/protractor.conf.js