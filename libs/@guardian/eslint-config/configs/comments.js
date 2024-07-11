import { fixupPluginRules } from '@eslint/compat';
import eslintComments from 'eslint-plugin-eslint-comments';

export default {
	plugins: {
		'eslint-comments': fixupPluginRules(eslintComments),
	},
	rules: {
		// require a `eslint-enable` comment for every `eslint-disable` comment
		'eslint-comments/disable-enable-pair': [2, { allowWholeFile: true }],

		// disallow duplicate `eslint-disable` comments
		'eslint-comments/no-duplicate-disable': 2,

		// disallow unused eslint-en/disable comments
		// (make sure they're not left in after a fix)
		'eslint-comments/no-unused-disable': 2,
		'eslint-comments/no-unused-enable': 2,

		// require an explanation if you disable eslint
		'eslint-comments/require-description': [2, { ignore: ['eslint-enable'] }],
	},
};
