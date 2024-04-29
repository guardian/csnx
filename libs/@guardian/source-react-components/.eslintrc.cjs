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
			files: ['**/*.test.*'],
			env: {
				jest: true,
			},
		},
	],
};
