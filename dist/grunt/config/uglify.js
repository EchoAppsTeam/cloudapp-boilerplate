module.exports = function(grunt) {
	'use strict';
	return {
		options: {
			report: grunt.option('verbose') ? 'gzip' : 'min'
		},
		js: {
			files: [{
				expand: true,
				cwd: '<%= dirs.build %>',
				src: '<%= sources.js %>',
				dest: '<%= dirs.build %>'
			}]
		}
	};
};
