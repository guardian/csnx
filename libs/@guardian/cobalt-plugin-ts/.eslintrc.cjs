module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: [
		'!**/*',
		'node_modules',
		'jest.dist.*', // depends on build output, so don't lint it
	],
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
