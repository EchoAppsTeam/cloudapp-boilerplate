module.exports = {
	options: {
		preset: 'google',
		validateIndentation: '\t',
		maximumLineLength: {
			value: 100
		}
	},
	grunt: {
		src: '<%= jshint.grunt.src %>'
	}
};
