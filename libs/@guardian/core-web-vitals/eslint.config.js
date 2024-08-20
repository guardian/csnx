import guardian from '@guardian/eslint-config';

export default [
	...guardian.configs.recommended,
	...guardian.configs.jest,
	{
		ignores: [
			'node_modules',
			'dist',
			'jest.dist.*', // depends on build output, so don't lint it
			'.wireit',
		],
	},
];
