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

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.webconcat = {
  setUp: function(done) {
    done();
  },

  defaults: function(test) {
    test.expect(1);

		var actual
			, expected;

    actual = grunt.file.read(
				__dirname + '/../tmp/webconcat-defaults.js'
		);
    expected = grunt.file.read(
				__dirname + '/expected/webconcat-defaults.js'
		);
    test.equal(
			actual,
			expected,
			'Expect files to be concatenated and default options to be used'
		);

    test.done();
  },

  customs: function(test) {
    test.expect(1);

		var actual
			, expected;

    actual = grunt.file.read(
				__dirname + '/../tmp/webconcat-custom.js'
		);
    expected = grunt.file.read(
				__dirname + '/expected/webconcat-custom.js'
		);
    test.equal(
			actual,
			expected,
			'Expect custom options to be honored'
		);

    test.done();
  }
};
