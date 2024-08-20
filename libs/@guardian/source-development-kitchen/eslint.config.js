import guardian from '@guardian/eslint-config';

export default [
	...config,
	{
		ignores: [
			'node_modules',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
		],
	},
];
