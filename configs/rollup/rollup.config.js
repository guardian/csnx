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

/** @type {import("rollup").RollupOptions["output"]}  */
const output = {
	dir: 'dist',
	format: 'esm',
	preserveModules: true,
	preserveModulesRoot: 'src',
};

/**
 * @param {import('rollup-plugin-node-externals').ExternalsOptions} externalsOptions
 * @returns {Plugins}
 */

const defaultPlugins = (externalsOptions) => [
	nodeResolve({
		extensions: ['.cjs', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
	}),
	commonjs(),
	json(),
	nodeExternals(externalsOptions),
];

/**
 * @param {object} param0
 * @param {Plugins} [param0.plugins]
 * @param {Input} [param0.input]
 * @param {import('rollup-plugin-node-externals').ExternalsOptions} [param0.externalsOptions]
 * @param {import("rollup").RollupOptions["output"]} [param0.cjsOutputOptions]
 * @returns {import("rollup").RollupOptions[]}
 */
export default ({
	input = defaultInput,
	plugins = [],
	externalsOptions,
	cjsOutputOptions,
} = {}) => [
	{
		input,
		output,
		plugins: [...defaultPlugins(externalsOptions), ...plugins, esbuild()],
	},
	{
		input,
		output: {
			...output,
			...cjsOutputOptions,
			format: 'cjs',
			entryFileNames: '[name].cjs',
		},
		plugins: [...defaultPlugins(externalsOptions), ...plugins, esbuild()],
	},
	{
		input,
		output,
		plugins: [...defaultPlugins(externalsOptions), ...plugins, dts()],
	},
];
