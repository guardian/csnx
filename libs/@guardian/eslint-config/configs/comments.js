import { fixupPluginRules } from '@eslint/compat';
import eslintComments from 'eslint-plugin-eslint-comments';

export default {
	name: '@guardian/comments',
	plugins: {
		'eslint-comments': fixupPluginRules(eslintComments),
	},
	rules: {
		// require a `eslint-enable` comment for every `eslint-disable` comment
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

		// disallow duplicate `eslint-disable` comments
		'eslint-comments/no-duplicate-disable': 'error',

		// disallow unused eslint-en/disable comments
		// (make sure they're not left in after a fix)
		'eslint-comments/no-unused-disable': 'error',
		'eslint-comments/no-unused-enable': 'error',

		// require an explanation if you disable eslint
		'eslint-comments/require-description': [
			'error',
			{ ignore: ['eslint-enable'] },
		],
	},
};
