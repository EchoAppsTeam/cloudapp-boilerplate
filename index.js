module.exports = function(grunt) {
	'use strict';

	require('time-grunt')(grunt);

	var _ = require('lodash');
	var path = require('path');
	var loadTasks = require('load-grunt-tasks');

	function createEnvironment() {
		var env = {
			debug: !!grunt.option('debug'),
			name: grunt.option('env'),
			list: ['development', 'test', 'staging', 'production']
		};
		if (!_.contains(env.list, env.name)) {
			env.name = 'development';
		}
		grunt.template.addDelimiters('configPlaceholder', '{%', '%}');
		env.replacePlaceholders = function(text) {
			// return text as is if there are no placeholders
			if (!/{%=/.test(text)) return text;
			return grunt.template.process(text, {
				data: grunt.config('env.config'),
				delimiters: 'configPlaceholder'
			});
		};
		return env;
	}

	function getEnvironmentConfig(name, pkg) {
		var envFilename = 'config/environments/' + name + '.json';
		if (!grunt.file.exists(envFilename)) return {};
		var config = grunt.file.readJSON(envFilename);
		var parts = pkg.version.split('.');
		config.packageVersions = {
			stable: parts.join('.'),
			latest: parts[0]
		};
		return config;
	}

	var cwd = process.cwd();
	function getPath(subpath, from) {
		return path.join(
			from === 'app' ? cwd : __dirname,
			subpath
		);
	}

	var env = createEnvironment();
	// print environment notice
	grunt.log.writeln('');
	grunt.log.writeln('DEBUG mode is ' + (env.debug ? 'ON'.green : 'OFF'.red));
	grunt.log.writeln('Working in the ' + (env.name === 'production' ? 'PRODUCTION'.red : env.name.toUpperCase().green) + ' environment');
	grunt.log.writeln('');

	['own', 'app'].forEach(function(from) {
		var p = getPath('', from);
		grunt.verbose.subhead('Changing path to ' + p);
		process.chdir(p);
		grunt.loadTasks((from === 'own' ? 'dist/' : '') + 'grunt/tasks');
		loadTasks(grunt, {
			pattern: ['grunt-contrib-*', 'grunt-*', 'sphere']
		});
	});
	require('load-grunt-config')(grunt, {
		configPath: getPath('dist/grunt/config', 'own'),
		overridePath: getPath('grunt/config', 'app'),
		postProcess: function(config) {
			env.config = getEnvironmentConfig(env.name, config.package);
			config.env = env;
		}
	});

	grunt.registerTask('default', ['check-environment:' + env.name, 'newer:jshint', 'newer:jscs', 'clean:all', 'build']);
};
