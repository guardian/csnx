import guardian from '@guardian/eslint-config';

export default [
	{
		ignores: [
			'**/dist',
			'**/storybook-static',
			'**/.wireit',
			'**/node_modules',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
];
