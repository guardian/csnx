/** @typedef {import("rollup").RollupOptions["plugins"]} Plugins  */
/** @typedef {import("rollup").RollupOptions["input"]} Input  */

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { nodeExternals } from 'rollup-plugin-node-externals';

/** @type {Input}  */
const defaultInput = { index: 'src/index.ts' };

/** @type {import("rollup").RollupOptions.output}  */
const output = {
	dir: 'dist',
	format: 'esm',
	preserveModules: true,
	preserveModulesRoot: 'src',
};

/** @type {Plugins} */
const defaultPlugins = [
	nodeResolve({
		extensions: ['.cjs', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
	}),
	commonjs(),
	json(),
	nodeExternals(),
];

/**
 * @param {object} param0
 * @param {Plugins} param0.plugins
 * @param {Input} param0.input
 * @returns {import("rollup").RollupOptions[]}
 */
export default ({ input = defaultInput, plugins = [] } = {}) => [
	{
		input,
		output,
		plugins: [...defaultPlugins, ...plugins, esbuild()],
	},
	{
		input,
		output: {
			...output,
			format: 'cjs',
			entryFileNames: '[name].cjs',
		},
		plugins: [...defaultPlugins, ...plugins, esbuild()],
	},
	{
		input,
		output,
		plugins: [...defaultPlugins, ...plugins, dts()],
	},
];
