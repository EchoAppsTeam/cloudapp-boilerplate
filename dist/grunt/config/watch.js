module.exports = {
	src: {
		files: [
			'<%= sources.js %>',
			'<%= sources.demo %>',
			'Gruntfile.js',
			'grunt/**'
		],
		tasks: ['default'],
		options: {
			interrupt: true
		}
	}
};
