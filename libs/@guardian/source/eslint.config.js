import guardian from '@guardian/eslint-config';

export default [
	{
		ignores: [
			'node_modules',
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
			'storybook-static',
		],
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
	...guardian.configs.storybook,
	{
		// storybook is in a world of its own
		files: ['.storybook/main.js'],
		...guardian.configs.cjs,
	},
];
