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

  grunt.registerMultiTask('webconcat', 'Concatenate remote files', function() {
    var async = require('async')
			, request = require('request')
			, _ = grunt.util._
			, comment = require('./lib/comment').init(grunt)
			, options = this.options({
				banner: '',
				separator: grunt.util.linefeed,
				stripBanners: false,
				preserveOrder: true
			})
			, arrMap = options.preserveOrder ? async.mapSeries : async.map
			, done = _.after(this.files.length, this.async()) // This is an async task
			, banner;

		if(options.stripBanners === true) {
			options.stripBanners = {
				block: true // Remove block comments
			};
		}

		banner = grunt.template.process(options.banner);

    this.files.forEach(function(files) {
      arrMap(files.orig.src, request, function(error, responses) {
        var bodies = _.pluck(responses, "body")
          , destination = files.dest;

        if(options.stripBanners) {
          bodies = bodies.map(function(body) {
            return comment.stripBanner(body, options.stripBanners);
          });
        }

        grunt.file.write(
          destination,
          options.banner + bodies.join(options.separator)
        );

        grunt.log.oklns('File "' + destination + '" created.');

        done();
      });
    });
  });
};
