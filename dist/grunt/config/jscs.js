module.exports = function() {
	'use strict';
	var jscs = require('jscs/lib/utils');
	return {
		options: {
			preset: 'google',
			validateIndentation: '\t',
			// value "true" for this parameter requires ternary operator symbols (? & :)
			// to be in the end of the line and not in the beginning,
			// let's not force the rule for this symbol but keep for all others in place
			requireOperatorBeforeLineBreak: jscs.binaryOperators,
			maximumLineLength: {
				value: 100
			}
		},
		grunt: {
			src: '<%= jshint.grunt.src %>'
		}
	};
};
