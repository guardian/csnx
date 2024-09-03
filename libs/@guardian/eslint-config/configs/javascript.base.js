import js from '@eslint/js';
// import stylistic from '@stylistic/eslint-plugin';

export default {
	name: '@guardian/javascript',
	plugins: {
		// this currently creates a types clash in node_modules so disable this for now
		// https://github.com/eslint/rewrite/issues/104
		// '@stylistic': stylistic,
	},
	rules: {
		...js.configs.recommended.rules,

		// prevent dangling returns without braces
		curly: ['error', 'all'],

		// delimit members with semi-colons and require
		// one at the end to keep diffs simpler
		// '@stylistic/member-delimiter-style': [
		// 	2,
		// 	{
		// 		multiline: {
		// 			delimiter: 'semi',
		// 			requireLast: true,
		// 		},
		// 		singleline: {
		// 			delimiter: 'semi',
		// 			requireLast: false,
		// 		},
		// 	},
		// ],
	},
};
