module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * jshint task
         */
        jshint: {
            allFiles: ['Gruntfile.js',
                       'src/app/js/**/*.js',
                       'test/unit/**/*.js',
                       'test/e2e/**/*.js'],
            options: {
                jshintrc: 'config/.jshintrc'
            }
        },
        /**
         * jasmine task
         */
        jasmine: {
            pivotal: {
                src: 'src/app/js/**/*.js',
                options: {
                    specs: 'test/unit/**/*.js',
                    vendor: [
                        'src/lib/jquery-1.11.0.min.js',
                        'src/lib/jquery-ui-1.10.4.min.js',
                        'src/lib/bootstrap.min.js',
                        'src/lib/angular/angular.js',
                        'src/lib/angular-route/angular-route.js',
                        'src/lib/angular-resource/angular-resource.js',
                        'src/lib/angular-mocks.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'test/coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'test/coverage/html'
                                }
                            }                      
                        ]
                    }
                }
            }
        },
        /**
         * karma task
         */
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'jasmine']);
};