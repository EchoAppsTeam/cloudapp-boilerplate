module.exports = {
	js: {
		expand: true,
		cwd: '<%= dirs.src %>',
		src: '<%= sources.js %>',
		dest: '<%= dirs.build %>/'
	},
	'third-party': {
		expand: true,
		cwd: '<%= dirs.src %>',
		src: [
			'third-party/*.js',
			'third-party/*.css'
		],
		dest: '<%= dirs.build %>/'
	},
	demo: {
		src: '<%= sources.demo %>',
		dest: '<%= dirs.build %>/'
	},
	images: {
		expand: true,
		cwd: '<%= dirs.src %>',
		src: '<%= sources.images %>',
		dest: '<%= dirs.build %>/'
	},
	manifest: {
		src: 'app-manifest.json',
		dest: '<%= dirs.build %>/'
	},
	build: {
		options: {
			processContent: '<%= env.replacePlaceholders %>',
			processContentExclude: '**/*.{png,jpg,jpeg,gif}'
		},
		files: [{
			expand: true,
			cwd: '<%= dirs.build %>',
			src: ['**'],
			dest: '<%= dirs.dest %>'
		}]
	}
};
