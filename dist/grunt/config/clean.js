module.exports = {
	build: [
		'<%= dirs.build %>/*'
	],
	all: [
		'<%= dirs.dist %>/*',
		'<%= clean.build %>'
	]
};
