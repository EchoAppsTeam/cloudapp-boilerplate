module.exports = {
	options: {
		tasks: {
			dev: [
				'copy:js',
				'concat'
			],
			min: [
				'copy:js',
				'uglify',
				'concat'
			],
			final: [
				'copy:demo',
				'copy:images',
				'copy:manifest'
			]
		}
	}
};
