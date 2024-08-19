import config from '../../../eslint.config.base.mjs';

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
