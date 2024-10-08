import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default {
	name: '@guardian/javascript',
	plugins: {
		'@stylistic': stylistic,
	},
	rules: {
		...js.configs.recommended.rules,

		// prevent dangling returns without braces
		curly: ['error', 'all'],

		// delimit members with semicolons and require
		// one at the end to keep diffs simpler
		'@stylistic/member-delimiter-style': [
			2,
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
	},
};
