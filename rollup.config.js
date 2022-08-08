const json = require('@rollup/plugin-json');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = (config) => {
	return {
		...config,
		plugins: [...config.plugins, commonjs(), json()],
	};
};
