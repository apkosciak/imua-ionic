
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    dist: require('./bower.json').appPath || 'www',
    dev: 'www',
    src: 'src'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    imuamobile: appConfig,
    
    // Moving files
    copy: {
      bowercss: {
        flatten: true,
        expand: true,
        cwd: 'bower_components/',
        dest: '<%= imuamobile.src %>/sass',
        src: '**/*.css',
        ext: '.scss'
      },
      main: { // Copy main files
        expand: true,
        cwd: '<%= imuamobile.src %>',
        dest: '<%= imuamobile.dev %>',
        src: ['index.html','favicon.ico','404.html','robots.txt']
      },
      js: { // Copy javascript files (non-coffeescript)
        expand: true,
        cwd: '<%= imuamobile.src %>/js',
        dest: '<%= imuamobile.dev %>/scripts',
        src: '**/*.js'
      },
      css: { // Copy css files (non-sass)
        expand: true,
        cwd: '<%= imuamobile.src %>/css',
        dest: '<%= imuamobile.dev %>/styles',
        src: '**/*.css'
      },
      fonts: { // Copy fonts files
        expand: true,
        cwd: '<%= imuamobile.src %>/fonts',
        dest: '<%= imuamobile.dev %>/fonts',
        src: '**'
      },
      assets: { // Copy asset files
        expand: true,
        cwd: '<%= imuamobile.src %>/assets',
        dest: '<%= imuamobile.dev %>/assets',
        src: '**'
      }
    },

    clean: {
      dev: {
        files: [{
          dot: true,
          src: [
            '<%= imuamobile.dev %>/scripts',
            '<%= imuamobile.dev %>/styles',
            '<%= imuamobile.dev %>/fonts',
            '<%= imuamobile.dev %>/assets',
            '<%= imuamobile.dev %>/index.html',
            '<%= imuamobile.dev %>/favicon.ico',
            '<%= imuamobile.dev %>/404.html',
            '<%= imuamobile.dev %>/robots.txt'
          ]
        }]
      }
    },

    // setting up the template-cache
    ngtemplates: {
      myApp: {
        cwd: '<%= imuamobile.src %>/templates',
        src: '**/*.html',
        dest: '<%= imuamobile.dev %>/scripts/templates.js'
      }
    },

    // The actual grunt server settings
    connect: {
      options:{
        port: 9000,
        hostname: 'localhost',
        livereload: 35729,
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use('/bower_components',connect.static('./bower_components')),
              connect.static(appConfig.dev)
            ];
          }
        }
      }
    },
   
    // Inject the bower components into the app 
    wiredep: {
      app: {
        src: ['<%= imuamobile.dev %>/index.html'],
        dest: ['<%= imuamobile.dev %>/index.html'],
        ignorePath: /\.\.\//
      }
    },

    // Inject the javascript into the app
    injector: {
      options: {
        ignorePath: appConfig.dev+'/',
        addRootSlash: false
      },
      local_dependencies: {
        files: {
          '<%= imuamobile.dev %>/index.html':[
            '<%= imuamobile.dev %>/scripts/**/*.js',
            '<%= imuamobile.dev %>/styles/**/*.css'
          ]
        }
      }
    },

    // Compile coffeescript to javascript
    coffee: {
      compile:{
        files: [{
          expand: true,
          cwd: '<%= imuamobile.src %>/coffee',
          dest: '<%= imuamobile.dev %>/scripts',
          src: '**/*.coffee',
          extDot: 'first',
          ext: '.js'
        }]
      }
    },

    // Compile sass to css
    sass: {
      compile: {
        files: [{
          expand: true,
          cwd: '<%= imuamobile.src %>/sass',
          dest: '<%= imuamobile.dev %>/styles',
          src: 'application.scss',
          ext: '.css'
        }]
      }
    },

    // Watch for changes 
    watch: {
      index:{
        options:{livereload: true },
        files: ['<%= imuamobile.src %>/index.html'],
        tasks: ['copy:main','wiredep','injector']
      },
      coffee:{
        options:{livereload: true },
        files: ['<%= imuamobile.src %>/coffee/**/*.coffee'],
        tasks: ['newer:coffee']
      },
      sass:{
        options:{livereload: true },
        files: ['<%= imuamobile.src %>/sass/**/*.scss'],
        tasks: ['sass']
      },
      templates:{
        options:{livereload: true },
        files: ['<%= imuamobile.src %>/templates/**/*.html'],
        tasks: ['ngtemplates','injector']
      }
    }

  });

  grunt.registerTask('copydev',
    ['copy:main','copy:js','copy:css','copy:assets','copy:fonts']
  );

  // Builds the src files 
  grunt.registerTask('build','Build to either \"dev\" or \"dist\"',function(target){
    if (target === 'dist'){
      imuamobile.dev = "www";
    } 
    grunt.task.run([
      'clean:dev',
      'copy:bowercss',
      'sass',
      'coffee',
      'ngtemplates',
      'copydev',
      'wiredep',
      'injector'
    ]);
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    if (target === 'dist') {
      //return grunt.task.run(['build', 'connect:dist:keepalive']);
    } else {
      grunt.task.run([
        'build:dev',
        'connect:livereload',
        'watch'
      ]);

/* Original grunt setup for reference
      grunt.task.run([
        'clean:server',
        'wiredep',
        'coffee',
        'concurrent:server',
        'autoprefixer:server',
        'connect:livereload',
        'watch'
      ]);
*/
    }
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

/* Original grunt setup for reference
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
*/

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
