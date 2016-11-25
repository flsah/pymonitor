'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                '-W033': true
            },
            pre: ['../web/charts/monitorchart.js', '../web/js/*boards.js', '../web/js/utils.js'],
            after: ['../web/charts/monitorchart.min.js', '../web/js/boards.min.js']
        },
        concat: {
            css: {
                src: [
                    '../web/css/dashboard.css',
                    '../web/css/charts.css',
                    '../web/css/ie10-viewport-bug-workaround.css'
                ],
                dest: '../web/css/monitor.css'
            },
            js: {
                src: ['../web/js/utils.js', '../web/js/*board.js'],
                dest: '../web/js/boards.js'
            },
            ie: {
                src: ['../web/js/ie*.js'],
                dest: '../web/js/ie-adapter.js'
            }
        },
        uglify: {
            static_mappings: {
                files: [
                    {src: '../web/js/boards.js', dest: '../web/js/boards.min.js'},
                    {src: '../web/charts/monitorchart.js', dest: '../web/charts/monitorchart.min.js'},
                    {src: '../web/js/ie-adapter.js', dest: '../web/js/ie-adapter.min.js'}
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    '../web/css/monitor.min.css': '../web/css/monitor.css'
                }
            }
        },
        clean: {
            build: {
                src: ['dist']
            }
        },
        copy: {
            templates: {
                files: [{
                    expand: true,
                    cwd: '../web/css/',
                    src: '**/*',
                    dest: 'dist/web/css/',
                    filter: function (dest) {
                        var cwd = this.cwd,
                            src = dest.replace(new RegExp('^' + cwd), '');
                        dest = grunt.task.current.data.files[0].dest;

                        if (src.startsWith('less/')) {
                            return true;
                        }
                        if (src.indexOf('.min.') < 0) {
                            return false;
                        }

                        return (!grunt.file.exists(dest + src));
                    }
                }, {
                    expand: true,
                    cwd: '../web/charts/',
                    src: '**/*',
                    dest: 'dist/web/charts',
                    filter: function (dest) {
                        var src = dest.replace(new RegExp('^' + this.cwd), '');
                        return !src.endsWith('monitorchart.js');
                    }
                }, {
                    expand: true,
                    cwd: '../web/',
                    src: '*',
                    dest: 'dist/web',
                    filter: function (dest) {
                        var src = dest.replace(new RegExp('^' + this.cwd), '');
                        return !src.endsWith('charts.html');
                    }
                }, {
                    'dist/lib/': '../lib/*.py',
                    'dist/web/': '../web/js/*.min.js',
                    'dist/report/': '../report/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['jshint:pre', 'concat', 'uglify', 'cssmin', 'jshint:after']);
};