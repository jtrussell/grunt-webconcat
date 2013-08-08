/**
 *  ------------------------------------------------------------------------
 *  @project: grunt-webconcat
 *  @date: 2013-08-08
 *  @author: Justin Russell
 *
 *  Copyright (c) 2013, iVantage Health Analytics, Inc.
 *  ------------------------------------------------------------------------
*/

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    webconcat: {
      defaults: {
        files: {
					'tmp/webconcat-defaults.js': [
						'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js',
						'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js'
					]
        }
      },
			custom: {
				options: {
					stripBanners: true,
					banner: '/*! foobar */\n',
					separator: ';;;'
				},
        files: {
					'tmp/webconcat-custom.js': [
						'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js',
						'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js'
					]
        }
			}
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'jshint', 'webconcat', 'nodeunit']);

	grunt.registerTask( 'default', ['test'] );
};
