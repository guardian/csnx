// This is repo-wide base config for eslint. It's not used directly by any
// project, but is extended by each project's own eslint config.

module.exports = {
	root: true,
	// disable eslint on all files by default, for perf reasons
	// re-enabled in each projects own eslint config (ignorePatterns: ['!**/*'])
	ignorePatterns: ['**/*'],
	plugins: ['@nx'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {
				'@nx/enforce-module-boundaries': [
					'error',
					{
						enforceBuildableLibDependency: true,
						allow: ['@csnx/**'],
						depConstraints: [
							{
								sourceTag: '*',
								onlyDependOnLibsWithTags: ['*'],
							},
						],
					},
				],
			},
		},
		{
			files: ['*.js', '*.jsx'],
			extends: ['plugin:@nx/javascript', '@guardian/eslint-config'],
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: ['plugin:@nx/typescript', '@guardian/eslint-config-typescript'],
			settings: {
				'import/resolver': {
					typescript: {
						project: 'tsconfig.base.json',
					},
				},
			},
		},
		{
			files: ['.lintstagedrc.js'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	extends: ['plugin:storybook/recommended'],
};
