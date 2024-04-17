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
			files: ['**/*.test.*'],
			env: {
				jest: true,
			},
		},
		{
			files: ['*.d.ts'],
			parserOptions: {
				project: ['libs/@guardian/prettier/tsconfig.json'],
			},
			rules: {},
		},
	],
};
