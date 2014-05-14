module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    jshint: {

      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'tests/**/*.js'
      ],

      options: {
        newcap: false,
        node: true,
        expr: true,

        globals: {
          window: true,
          describe: true,
          define: true,
          require: true,
          expect: true,
          it: true,
          beforeEach: true,
          afterEach: true,
          MissionControl: true,
          Class: true,
          Interface: true,
          sinon: true
        }
      }

    },

    jsdoc : {
      dist : {
        src: ['source/**/*.js', 'documentation/index.md'],
        options: {
          destination: 'documentation/output',
          template: '../documentary/source/template',
          configure: 'documentation/jsdoc.conf.json'
        }
      }
    },

    clean: {
      documentation: ["documentation/output"]
    },

    mocha: {
      test: {
        src: ['tests/index.html'],

        options: {
          run: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('docs', ['clean:documentation', 'jsdoc:dist']);
  grunt.registerTask('default', 'watch');

};