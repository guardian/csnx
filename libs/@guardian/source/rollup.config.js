import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { nodeExternals } from 'rollup-plugin-node-externals';
import alias from '@rollup/plugin-alias';
import { resolve } from 'node:path';

/** @type {import("rollup").RollupOptions.input}  */
const input = {
	foundations: 'src/foundations/index.ts',
	'react-components': 'src/react-components/index.ts',
};

/** @type {import("rollup").RollupOptions.output}  */
const output = {
	dir: 'dist',
	format: 'esm',
	preserveModules: true,
};

/** @type {import("rollup").RollupOptions.plugins}  */
const plugins = [
	alias({
		entries: [
			{
				find: '@guardian/source-foundations',
				replacement: resolve('./src/foundations/index.ts'),
			},
			{
				find: '@guardian/source-react-components',
				replacement: resolve('./src/react-components/index.ts'),
			},
		],
	}),
	nodeResolve({
		extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
	}),
	commonjs(),
	json(),
	nodeExternals(),
];

/** @type {import("rollup").RollupOptions}  */
export default [
	{
		input,
		output,
		plugins: [...plugins, esbuild()],
	},
	{
		input,
		output: {
			...output,
			format: 'cjs',
			entryFileNames: '[name].cjs',
		},
		plugins: [...plugins, esbuild()],
	},
	{
		input,
		output,
		plugins: [...plugins, dts()],
	},
];
