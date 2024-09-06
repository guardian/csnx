import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

export default [
	{
		name: '@guardian/comments',
		plugins: comments.recommended.plugins,
		rules: {
			// require a `eslint-enable` comment for every `eslint-disable` comment
			'@eslint-community/eslint-comments/disable-enable-pair': [
				'error',
				{ allowWholeFile: true },
			],

			// disallow duplicate `eslint-disable` comments
			'@eslint-community/eslint-comments/no-duplicate-disable': 'error',

			// disallow unused eslint-en/disable comments
			// (make sure they're not left in after a fix)
			'@eslint-community/eslint-comments/no-unused-disable': 'error',
			'@eslint-community/eslint-comments/no-unused-enable': 'error',

			// require an explanation if you disable eslint
			'@eslint-community/eslint-comments/require-description': [
				'error',
				{ ignore: ['eslint-enable'] },
			],
		},
	},
];
