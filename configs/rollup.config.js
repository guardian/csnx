import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { nodeExternals } from 'rollup-plugin-node-externals';

/** @type {import("rollup").RollupOptions.input}  */
const input = { index: 'src/index.ts' };

/** @type {import("rollup").RollupOptions.output}  */
const output = {
	dir: 'dist',
	format: 'esm',
	preserveModules: true,
	preserveModulesRoot: 'src',
};

/** @type {import("rollup").RollupOptions.plugins}  */
const plugins = [
	nodeResolve({
		extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
	}),
	commonjs(),
	json(),
	esbuild(),
	nodeExternals(),
];

/** @type {import("rollup").RollupOptions}  */
export default [
	{
		input,
		output,
		plugins,
	},
	{
		input,
		output: {
			...output,
			format: 'cjs',
			entryFileNames: '[name].cjs',
		},
		plugins,
	},
	{
		input,
		output,
		plugins: [dts()],
	},
];
