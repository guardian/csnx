// This is repo-wide base config for eslint. It's not used directly by any
// project, but is extended by each project's own eslint config.

module.exports = {
	root: true,
	// disable eslint on all files by default, for perf reasons
	// re-enabled in each projects own eslint config (ignorePatterns: ['!**/*'])
	ignorePatterns: ['**/*'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
			extends: ['@guardian/eslint-config'],
		},
		{
			files: ['*.ts', '*.tsx', '*.mts', '*.cts', '*.d.ts'],
			extends: ['@guardian/eslint-config-typescript'],
			settings: {
				'import/resolver': {
					typescript: {
						project: 'tsconfig.base.json',
					},
				},
			},
		},
		{
			files: ['.lintstagedrc.js'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
		{
			files: ['*.stories.*'],
			rules: {
				// stories require default exports
				'import/no-default-export': 'off',
			},
		},
	],
	extends: ['plugin:storybook/recommended'],
};
