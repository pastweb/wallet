module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.config.js',
        options: {
          files: [
                  //  Dependencies
                  '../lib/angular-1.3.8/angular.js',
                  '../lib/angular-1.3.8/angular-mocks.js',
                  '../lib/jquery/jquery-2.1.1.min.js',
                  '../lib/bootstrap-ui/bootstrap-3.2.0-dist/js/bootstrap.min.js',
                  '../lib/ngStorage/ngStorage.min.js',
                  '../lib/angular-ui-router/angular-ui-router.min.js',
                  //  My Code
                  '../js/*.js',
                  '../js/**/*.js',
                  // Unit test
                  'unit/**/*.test.js'
                  ]
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });
  // Load Plugins
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks List
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default', ['karma', 'concat', 'uglify', 'cssmin']);

};