module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['tokens.d.ts'],
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
