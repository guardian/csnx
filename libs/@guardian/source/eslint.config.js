import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.esm,
	...guardian.configs.jest,
	...guardian.configs.react,
	{
		ignores: [
			'node_modules',
			'jest.dist.*', // depends on build output, so don't lint it
			'dist',
			'storybook-static',
			'.wireit',
		],
	},
];
