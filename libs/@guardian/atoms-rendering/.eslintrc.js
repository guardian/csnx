module.exports = {
	extends: ['../../../.eslintrc.js'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			settings: {
				react: {
					version: 'detect',
				},
			},
			parserOptions: {
				project: ['libs/@guardian/atoms-rendering/tsconfig.json'],
			},
			plugins: ['@emotion', '@typescript-eslint'],
			extends: [
				'plugin:react/recommended',
				'plugin:@guardian/eslint-plugin-source-foundations/recommended',
				'plugin:@guardian/eslint-plugin-source-react-components/recommended',
			],
			rules: {
				// These rules are temporarily disabled, to expedite importing Atoms-Rendering
				// they should not be switched off long term. Unless we want bugs.
				'react/no-unknown-property': [
					'error',
					{
						ignore: ['css'],
					},
				],
				'import/no-default-export': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'off',
				'eslint-comments/require-description': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/unbound-method': 'off',
				'no-unused-vars': 'off',
				'@emotion/import-from-emotion': 'error',
				'@emotion/no-vanilla': 'error',
				'@emotion/styled-import': 'error',
				'@typescript-eslint/no-unused-vars': 'error',
			},
		},
		{
			files: ['*.js', '*.jsx'],
			rules: {},
		},
		{
			files: ['*.test.ts', '*.stories.*'],
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
			},
		},
		{
			// these are only internal files, so we don't need to check them so
			// rigorously they often use things like JSON which are `any`s too,
			// we can be more lenient
			files: ['scripts/**/*'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
			},
		},
		{
			files: ['**/*.stories.tsx'],
			rules: {
				// storybook require this
				'import/no-default-export': 'off',
			},
		},
	],
};
