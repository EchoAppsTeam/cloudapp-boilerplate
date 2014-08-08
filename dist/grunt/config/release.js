module.exports = {
	options: {
		environment: '<%= env.name %>',
		debug: '<%= env.debug %>',
		configFile: 'config/release.json',
		location: '<%= env.name === "staging" ? "sandbox" : "cdn" %>',
		version: '<%= env.config.packageVersions.stable %>',
		remoteRoot: '<%= env.name === "staging" ? "/staging" : "" %>',
		purgeTitle: '<%= package.name %>',
		purgePaths: [
			'<%= release.options.path %>/v<%= release.options.version %>/'
		]
	},
	regular: {
		options: {
			deployTargets: {
				all: {
					src: '**',
					cwd: '<%= dirs.dist %>/',
					dest: '<%= release.options.remoteRoot %>' +
						'<%= release.options.path %>' +
						'/v<%= release.options.version %>/'
				}
			}
		}
	},
	purge: {
		options: {
			skipBuild: true
		}
	}
};
