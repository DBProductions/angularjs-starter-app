# AngularJS starter app

A simple AngualrJS application, ready to extend.  

The following libaries or frameworks are included:
* jQuery v1.11.0  
* jQuery UI v1.10.4  
* Twitter Bootstrap v3.1.1  
* Font Awesome v4.0.3  
* Angular v1.2.15  

## Getting started

Clone the angular-starter-app repository, install the dependencies and start the server.

### Prerequisites

You must have git, node and npm installed.

### Clone repository

Clone the angularjs-starter-app repository.

    $ git clone git@github.com:DBProductions/angularjs-starter-app.git
    $ cd angularjs-starter-app

Install the dependencies.

     $ npm install

### Run the application

There is a simple server to use the project, run it with node.  
The server holds some simple user data and can create, edit and delete them, there is no persistence.

    $ node server.js  
    Server listen on port 3000 browse at http://127.0.0.1:3000

## Grunt

As default there are three tasks defined, jshint, jasmine and yuidoc.

    $ grunt

Grunt creates an API documentation and a code coverage report.

## Karma

    $ grunt karma

## Protractor

Start the server and a standalone selenium server before you can run the end to end tests.

    $ webdriver-manager start

Run end to end tests with protractor.

    $ protractor config/protractor.conf.js