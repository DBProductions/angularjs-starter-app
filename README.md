# AngularJS starter app

A simple AngualrJS application, ready to extend.  
It has a simple CRUD (Create, Read, Update, Delete) functionality shown on a list and detail view.  
A server provide some simple user data to manipulate.

It isn't a full featured project what solves all your problems.  
Doing the [Angular Tutorial](https://docs.angularjs.org/tutorial) before is a good choice.  

The following libaries or frameworks are included:
* jQuery v1.11.2  
* Twitter Bootstrap v3.3.1  
* Font Awesome v4.3.0  
* Angular v1.3.14  

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

There is a simple `Express` server to use the project.  
The server holds some user data and can create user entries, edit and delete them.  
There is no persistence, all the time the server gets restared the old state is gone.

    $ node server.js

NPM is also configured to run the server.

    $ npm start

## Testing

The project contains configuration files for Grunt, Karma and Protractor.

### Grunt

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

As default there are following tasks defined, csslint, jshint, jscs, jasmine and yuidoc.

    $ grunt

Grunt creates an API documentation and a code coverage report.

### Karma

    $ karma start config/karma.conf.js

It is also configured as Grunt task.

    $ grunt karma

### Protractor

It's needed to start the server and a standalone selenium server before you can run the end to end tests.

    $ webdriver-manager start

Run end to end tests with protractor.

    $ protractor config/protractor.conf.js

It is also configured as Grunt task.

    $ grunt end2end

Protractor creates a screenshot for every end to end test (/test/e2e/screenshots/).

## Travis CI, Drone and Coveralls

The continuous integration service Travis CI is monitoring this repository: [Link](https://travis-ci.org/DBProductions/angularjs-starter-app)  
Drone is an other hosted continuous integration service: [Link](https://drone.io/github.com/DBProductions/angularjs-starter-app)  
The web service Coveralls is tracking code coverage for this repository: [Link](https://coveralls.io/r/DBProductions/angularjs-starter-app)

![Build Status](https://travis-ci.org/DBProductions/angularjs-starter-app.svg?branch=master) 
[![Build Status](https://drone.io/github.com/DBProductions/angularjs-starter-app/status.png)](https://drone.io/github.com/DBProductions/angularjs-starter-app/latest)
[![Coverage Status](https://coveralls.io/repos/DBProductions/angularjs-starter-app/badge.png)](https://coveralls.io/r/DBProductions/angularjs-starter-app)

## Feedback
Star this repo if you found it useful. Use the github issue tracker to give feedback on this repo.