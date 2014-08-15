module.exports = {
	options: {
		environment: '<%= env.name %>',
		debug: '<%= env.debug %>',
		configFile: 'config/release.json',
		location: '<%= env.name === "staging" ? "sandbox" : "cdn" %>',
		versionPath: function(version) {
			'use strict';
			version = version || this.target || 'stable';
			return '<%= release.options.path %>' +
				'/v<%= env.config.packageVersions.' + version + ' %>';
		},
		purgeTitle: '<%= package.name %>',
		purgePaths: [
			'<%= release.options.versionPath() %>/'
		],
		deployTargets: {
			all: {
				src: '**',
				cwd: '<%= dirs.dist %>/',
				dest: '<%= env.name === "staging" ? "/staging" : "" %>' +
					'<%= release.options.versionPath() %>/'
			}
		}
	},
	// we must put target here even if it doesn't have any specific options
	// because release task needs to know what possible targets are available
	stable: {},
	latest: {},
	purge: {
		options: {
			skipBuild: true,
			deployTargets: {},
			purgePaths: [
				'<%= release.options.versionPath("stable") %>/',
				'<%= release.options.versionPath("latest") %>/'
			]
		}
	}
};
