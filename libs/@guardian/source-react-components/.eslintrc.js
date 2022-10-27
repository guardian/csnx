module.exports = {
	extends: ['../../../.eslintrc.js'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: ['libs/@guardian/source-react-components/tsconfig.json'],
			},
			rules: {},
		},
		{
			files: ['*.ts', '*.tsx'],
			rules: {},
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
