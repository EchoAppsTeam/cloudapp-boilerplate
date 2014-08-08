module.exports = function(grunt) {
	'use strict';

	grunt.registerTask(
		'build',
		'Go through all stages of building some target/system',
		function(stage) {
			var tasks = [];
			if (!stage) {
				tasks = ['build:dev'];
				if (grunt.config('env.name') !== 'development') {
					tasks.push('build:min');
				}
				tasks.push('build:final');
				grunt.task.run(tasks);
				return;
			}
			grunt.config(
				'dirs.dest',
				'<%= dirs.dist %>' + (stage === 'dev' ? '/dev' : '')
			);
			tasks = grunt.config('build.options.tasks.' + stage);
			tasks = tasks.concat([
				'copy:build',
				'clean:build'
			]);
			grunt.task.run(tasks);
		}
	);
};
