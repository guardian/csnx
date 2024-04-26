module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: [
		'!**/*',
		'node_modules',
		'jest.dist.*', // depends on build output, so don't lint it
		'dist',
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
			files: ['*.ts', '*.tsx'],
			rules: {},
		},
		{
			files: ['*.js', '*.jsx'],
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
