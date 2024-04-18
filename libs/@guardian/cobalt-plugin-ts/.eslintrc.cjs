module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.d.ts'],
			parserOptions: {
				tsconfigRootDir: __dirname,
			},
			rules: {},
		},
		{
			files: ['*.js', '*.mjs'],
			rules: {},
		},
	],
};
