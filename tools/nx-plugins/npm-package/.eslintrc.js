module.exports = {
	extends: ['../../../.eslintrc.cjs'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: ['tools/nx-plugins/npm-package/tsconfig.json'],
			},
			rules: {
				'import/no-default-export': 'off', // Nx plugins export defaults
				'@typescript-eslint/unbound-method': 'off',
			},
		},
	],
};
