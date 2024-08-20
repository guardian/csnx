import js from '@eslint/js';

export default {
	name: '@guardian/javascript',
	rules: {
		...js.configs.recommended.rules,

		// prevent dangling returns without braces
		curly: ['error', 'all'],
	},
};
