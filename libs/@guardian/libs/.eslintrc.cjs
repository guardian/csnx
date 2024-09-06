module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: [
		'!**/*',
		'node_modules',
		'jest.dist.*', // depends on build output, so don't lint it
		'dist',
		'.wireit',
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
			// Be more lenient in tests.
			// We may be testing things the compiler may not be able to check anyway.
			files: ['*.test.*', 'jest.*'],
			env: {
				jest: true,
			},
			rules: {
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
			},
		},
	],
};
