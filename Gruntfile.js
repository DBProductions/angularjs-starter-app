module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * clean directories
         */
        clean: ['test/e2e/screenshots/*'],
        /**
         * jshint task
         */
        jshint: {
            allFiles: ['Gruntfile.js',
                       'server.js',
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
                        'src/lib/jquery-1.11.2.min.js',
                        'src/lib/bootstrap.min.js',
                        'src/lib/angular.min.js',
                        'src/lib/angular-route.min.js',
                        'src/lib/angular-resource.min.js',
                        'src/lib/angular-mocks.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: 'coverage/html'
                                }
                            },
                            {
                                type: 'lcovonly',
                                options: {
                                    dir: 'coverage'
                                }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    }
                }
            }
        },
        /**
         * create api documentation
         */
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.repository %>',
                options: { 
                    paths: ['src/app/js/',
                            'test/unit/'],
                    outdir: 'docs/'
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
        },
        /**
         * protractor task
         */
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js",
                keepAlive: true,
                noColor: false,
                args: {}
            },
            all: {
                options: {
                    configFile: "config/protractor.conf.js",
                    args: {}
                }
            }
        },
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default', ['jshint', 'jasmine', 'yuidoc']);
    grunt.registerTask('end2end', ['clean', 'protractor']);
};