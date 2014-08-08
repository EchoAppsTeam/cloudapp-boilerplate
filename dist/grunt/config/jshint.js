module.exports = {
	options: {
		es3: true,
		eqeqeq: true,
		expr: true,
		forin: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		nonew: false,
		smarttabs: true,
		strict: true,
		sub: true,
		trailing: true,
		undef: true,
		unused: 'vars',
		browser: true,
		scripturl: true,
		jquery: true,
		devel: true,
		laxbreak: true,
		node: true,
		'-W065': true, // suppress "missing radix" warning
		globals: {
			Echo: false
		}
	},
	grunt: {
		options: {
			unused: true
		},
		src: ['Gruntfile.js', 'grunt/**/*.js']
	},
	sources: {
		expand: true,
		src: '<%= sources.js %>',
		cwd: '<%= dirs.src %>',
		dest: '<%= dirs.src %>'
	}
};
