// Generated on 2014-01-13 using generator-angular 0.7.1
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
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/views/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass-directory-imports','compass:server','compass:serverViews', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            },
            serverViews: {
                options: {
                    sassDir: '<%= yeoman.app %>/views',
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'bower_components/**/*',
                            'images/{,*/}*.{webp}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            create_temp_view: {
                files: [
                    {
                        expand: true,
                        cwd: 'templates/views/',
                        src: ['*'],
                        dest: 'app/views/',
                        rename: function(dest, src) {
                            // use the source directory to create the file
                            // example with your directory structure
                            //   dest = 'dev/js/'
                            //   src = 'module1/js/main.js'
                            grunt.config.get('createTemplateName');


                            return src;
                        }
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server', 'compass:serverViews'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }animate.css
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Custom Task for creation files with a template
        'template': {
            'factory': {
                'options': {
                    'data': {
                        'dest': 'app/scripts/factories/',
                        'name': 'temp',
                        'title': 'Temp',
                        'path': 'temp'
                    }
                },
                'files': {
                    '<%= template.factory.options.data.dest %><%= template.factory.options.data.name %>.js': ['templates/scripts/factory.js.tpl']
                }
            },
            'view': {
                'options': {
                    'data': {
                        'dest': 'app/views/',
                        'name': 'temp',
                        'title': 'Temp',
                        'path': 'Temp'
                    }
                },
                'files': {
                    '<%= template.view.options.data.path %>/<%= template.view.options.data.name %>.view.html': ['templates/views/.view.html.tpl']
                }
            },
            'controller': {
                'options': {
                    'data': {
                        'dest': 'app/views/',
                        'name': 'temp',
                        'title': 'Temp',
                        'url': 'Temp',
                        'path': 'Temp',
                        'state': 'Temp',
                        'uiview': 'Temp'
                    }
                },
                'files': {
                    '<%= template.controller.options.data.path %>/<%= template.controller.options.data.name %>.controller.js': ['templates/views/.controller.js.tpl']
                }
            },
            'style': {
                'options': {
                    'data': {
                        'dest': 'app/views/',
                        'name': 'temp',
                        'path': 'Temp'
                    }
                },
                'files': {
                    '<%= template.style.options.data.path %>/<%= template.style.options.data.name %>.style.scss': ['templates/views/.style.scss.tpl']
                }
            }
        },

        // Custom Task Configuration
        'sass-directory-imports': {
            // This is an arbitrary name for this sub-task

            views: {
                options: {
                    dest: 'app/styles/views.scss'
                },
                files: {
                    src: [
                        'app/views/**/*style.scss'
                    ]
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bower-install',
            'sass-directory-imports',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    /**
     * Custom Tasks
     */
    grunt.registerTask('create-factory', 'Create a template', function(input) {
        if (input == null) {
            grunt.warn('Create templates must be specified, like create-factory:Test');

        }else{
            var targetPath = grunt.config.get('template.factory.options.data.dest'); //'app/scripts/factories/';

            var name = input;
            var title = name.charAt(0).toUpperCase() + name.slice(1);

            if(input.indexOf("/") != -1){
                var arrayInput = input.split('/');
                title = aName[aName.length-1];
                title = title.charAt(0).toUpperCase() + title.slice(1);
            }

            grunt.config.set('template.factory.options.data.title', title);
            grunt.config.set('template.factory.options.data.name', name);
            grunt.config.set('template.factory.options.data.path', name);

            if( !grunt.file.exists(targetPath + name) ){
                grunt.task.run(['template:factory']);
            }else{
                grunt.log.errorlns('Directory "' + targetPath + name + '" already exists');
            }
        }
    });


    grunt.registerTask('create-view', 'Create a template', function(name) {
        if (name == null) {
            grunt.warn('Create templates must be specified, like create-view:Test');

        }else{
            var lowerCaseName = name.toLowerCase();

            if(lowerCaseName.indexOf("/") != -1){
                var aName = lowerCaseName.split('/');
                lowerCaseName = aName[aName.length-1];
                var targetFilePath = '';
                var targetstatePath = '';

                for( var index=0; index<(aName.length-1); index++ ){
                    targetFilePath += aName[index] + '/';
                    targetstatePath += aName[index] + '.';
                }

                targetstatePath += lowerCaseName;

                //Get URL path
                var urlStatePath = targetstatePath.split(".").join("/");
                grunt.log.errorlns([
                    urlStatePath
                ]);

                //Get UI-View name
                var uiViewName = lowerCaseName;

                targetFilePath = 'app/views/' + targetFilePath + lowerCaseName;
                var capitalizedName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);


            }else{
                var capitalizedName = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
                var targetFilePath = 'app/views/' + lowerCaseName;
                var targetstatePath = lowerCaseName;
                var urlStatePath = lowerCaseName;
                var uiViewName = 'body';
            }

            grunt.config.set('template.view.options.data.name', lowerCaseName);
            grunt.config.set('template.view.options.data.path', targetFilePath);
            grunt.config.set('template.view.options.data.title', capitalizedName);
            grunt.config.set('template.controller.options.data.name', lowerCaseName);
            grunt.config.set('template.controller.options.data.path', targetFilePath);
            grunt.config.set('template.controller.options.data.state', targetstatePath);
            grunt.config.set('template.controller.options.data.title', capitalizedName);
            grunt.config.set('template.controller.options.data.url', urlStatePath);
            grunt.config.set('template.controller.options.data.uiview', uiViewName);
            grunt.config.set('template.style.options.data.name', lowerCaseName);
            grunt.config.set('template.style.options.data.path', targetFilePath);

            if( !grunt.file.exists(targetFilePath) ){
                grunt.task.run(['template:view', 'template:controller', 'template:style', 'sass-directory-imports']);

            }else{
                grunt.log.errorlns('Directory "' + targetPath + '" already exists');
            }
        }
    });


    grunt.registerMultiTask(
        'sass-directory-imports',
        'Write SASS @import statements to a single file to include a directory\'s entire contents dynamically.',
        function () {
            var srcFiles = this.filesSrc; //grunt.config.get('sass-directory-imports.views.files.src'); //this.filesSrc;
            var destFile = grunt.config.get('sass-directory-imports.views.options.dest');

            var newFileContents = [
                '// This file imports all view styles .scss files in this directory.',
                '// It is automatically generated by the grunt compass-directory-includes task.',
                '// Do not directly modify this file.',
                ''
            ];

            srcFiles.forEach(function (filepath) {
                var includeFile = filepath.replace("app","..");
                newFileContents.push('@import "' + includeFile + '";');
                grunt.log.oklns('@import "' + includeFile + '";');

            });

            newFileContents = newFileContents.join('\n');
            grunt.file.write(destFile, newFileContents);

        }
    );
};
