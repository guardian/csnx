import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.esm,
	{
		ignores: [
			'node_modules',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
		],
	},
];
