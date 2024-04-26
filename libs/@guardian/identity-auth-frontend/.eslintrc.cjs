module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				tsconfigRootDir: __dirname,
			},
			rules: {},
		},
		{
			files: ['*.test.*', 'jest.*'],
			env: {
				jest: true,
			},
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
			},
		},
	],
};
