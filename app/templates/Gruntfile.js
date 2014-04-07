// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },<% if (coffee) { %>
            coffee: {
                files: ['<%%= config.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:test', 'test:watch']
            },<% } else if (ts) { %>
            ts: {
                files: ['<%%= config.app %>/scripts/{,*/}*.ts'],
                tasks: ['typescript']
            },
            js: {
                files: ['<%%= config.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },<% } else { %>
            js: {
                files: ['<%%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },<% } %>
            gruntfile: {
                files: ['Gruntfile.js']
            },<% if (includeCompass) { %>
            compass: {
                files: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% } %>
            styles: {
                files: ['<%%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= config.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
                    '.tmp/scripts/{,*/}*.js',<% } if (ts) { %>
                    '.tmp/scripts/{,*/}*.js',<% } %>
                    '<%%= config.app %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= config.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dist %>/*',
                        '!<%%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/scripts/{,*/}*.js',
                '!<%%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (testFramework === 'mocha') { %>

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>

        // Jasmine testing framework configuration options
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %><% if (coffee) { %>

        // Compiles CoffeeScript to JavaScript
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/scripts',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },<% } %><% if (ts) { %>

        // Comples TypeScript to JavaScript
        typescript: {
              base: {
                src: ['<%%= config.app %>/scripts/**/*.ts'],
                dest: '<%%= config.app %>/scripts',
                options: {
                  module: 'amd', //or commonjs
                  target: 'es5', //or es3
                  basePath: '<%%= config.app %>/scripts',
                  sourceMap: false,
                  declaration: false
                }
              }
        },<% } %><% if (includeCompass) { %>

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= config.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= config.app %>/images',
                javascriptsDir: '<%%= config.app %>/scripts',
                fontsDir: '<%%= config.app %>/styles/fonts',
                importPath: '<%%= config.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= config.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } %>

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%%= config.app %>/index.html'],
                ignorePath: '<%%= config.app %>/'<% if (includeCompass) { %>,
                exclude: ['<%%= config.app %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js']
            },
            sass: {
                src: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: '<%%= config.app %>/bower_components/'
            }<% } else { %>
            }<% } %>
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= config.dist %>/scripts/{,*/}*.js',
                        '<%%= config.dist %>/styles/{,*/}*.css',
                        '<%%= config.dist %>/images/{,*/}*.*',
                        '<%%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= config.dist %>'
            },
            html: '<%%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= config.dist %>', '<%%= config.dist %>/images']
            },
            html: ['<%%= config.dist %>/{,*/}*.html'],
            css: ['<%%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= config.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/scripts/scripts.js': [
        //                 '<%%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'<% if (includeBootstrap) { %>,<% if (includeCompass) { %>
                        'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'<% } else { %>
                        'bower_components/bootstrap/dist/fonts/*.*'<% } %><% } %>
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },<% if (includeModernizr) { %>

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%%= config.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%%= config.dist %>/scripts/vendor/modernizr.js',
            files: [
                '<%%= config.dist %>/scripts/{,*/}*.js',
                '<%%= config.dist %>/styles/{,*/}*.css',
                '!<%%= config.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },<% } %>

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [<% if (includeCompass) { %>
                'compass:server',<% } if (coffee) { %>
                'coffee:dist',<% } if (ts) { %>
                'typescript',<% } %>
                'copy:styles'
            ],
            test: [<% if (coffee) { %>
                'coffee',<% } if (ts) { %>
                'typescript',<% } %>
                'copy:styles'
            ],
            dist: [<% if (coffee) { %>
                'coffee',<% } if (ts) { %>
                'typescript',<% } if (includeCompass) { %>
                'compass',<% } %>
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',<% if (testFramework === 'mocha') { %>
            'mocha'<% } else if (testFramework === 'jasmine') { %>
            'jasmine'<% } %>
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',<% if (includeModernizr) { %>
        'modernizr',<% } %>
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};