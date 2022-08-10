const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const ts = require('rollup-plugin-ts');
const copy = require('rollup-plugin-copy');

const external = ['@guardian/nrwl-rollup'];

module.exports = (_, options) => ({
	input: options.entryFile,
	output: [
		{
			dir: `${options.outputPath}/cjs`,
			format: 'cjs',
			sourcemap: true,
			preserveModules: true,
		},
		{
			dir: `${options.outputPath}/esm`,
			format: 'es',
			sourcemap: true,
			preserveModules: true,
		},
	],
	plugins: [
		copy({
			targets: options.assets.map((asset) => ({
				src: `${asset.input}/${asset.glob}`,
				dest: `${options.outputPath}`,
			})),
		}),
		nodeResolve({
			extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js'],
		}),
		ts({ tsconfig: options.tsconfig }),
		commonjs(),
	],
	external,
});
