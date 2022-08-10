const { swc } = require('rollup-plugin-swc3');

module.exports = (config) => ({
	...config,
	plugins: [
		...config.plugins,
		swc({
			tsconfig: 'tsconfig.base.json',
			jsc: {
				parser: {
					syntax: 'typescript',
				},
			},
		}),
	],
});
