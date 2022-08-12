module.exports = {
	extends: ['../../../.eslintrc.js'],
	ignorePatterns: ['!**/*', 'node_modules'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: ['tools/plugins/npm-package/tsconfig.json'],
			},
			rules: {
				'import/no-default-export': 'off', // Nx plugins export defaults
			},
		},
	],
};
