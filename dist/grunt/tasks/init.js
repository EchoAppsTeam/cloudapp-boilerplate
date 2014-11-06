module.exports = function(grunt) {
	'use strict';

	grunt.registerTask(
		'init',
		'First task to run after repository cloning',
		function() {
			var fs = require('fs');
			var path = require('path');
			var options = this.options({
				linkRoot: '~/domains/cdn'
			});
			var base = process.cwd();
			var configDir = path.resolve(base, 'grunt/config/');
			if (!fs.existsSync(configDir + '/release.js')) {
				grunt.log.warn('Can not figure out release path so no links are created.');
			} else {
				var releasePath = require(configDir + '/release.js').options.path;
				var linkRoot = require('untildify')(options.linkRoot);
				var appDir = path.join(linkRoot, releasePath);
				require('rimraf').sync(appDir);
				require('mkdirp').sync(appDir);
				var version = require(base + '/package.json').version;
				var majorVersion = version.split('.')[0];
				var source = path.resolve(base, 'web');
				var target = appDir + '/v' + majorVersion;
				fs.symlinkSync(source, target);
				grunt.log.writeln('Created symlink ' + target.cyan + ' -> ' + source.cyan);
			}
			grunt.task.run('init-environment');
		}
	);
};
