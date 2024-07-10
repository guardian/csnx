module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: [
		'!**/*',
		'node_modules',
		'jest.dist.*', // depends on build output, so don't lint it
		'.wireit',
		'dist',
		'storybook-static',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				tsconfigRootDir: __dirname,
			},
			rules: {},
		},
		{
			files: ['*.js', '*.jsx'],
			rules: {},
		},
		{
			files: ['**/*.test.*'],
			env: {
				jest: true,
			},
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
				// Storybook require this
				'import/no-default-export': 'off',
				// The CSF3 custom `render` function is lowercase. This breaks the rule
				// that component names must start with a capital letter.
				// https://github.com/storybookjs/storybook/issues/21115
				'react-hooks/rules-of-hooks': 'off',
			},
		},
	],
};
