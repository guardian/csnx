import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { nodeExternals } from 'rollup-plugin-node-externals';

const config = {
	input: 'src/index.ts',

	plugins: [
		nodeResolve({
			extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
		}),
		commonjs(),
		json(),
		esbuild(),
		nodeExternals(),
	],
};

export default [
	{
		...config,
		output: {
			dir: 'dist',
			format: 'esm',
			preserveModules: true,
		},
	},
	{
		...config,
		output: {
			dir: 'dist',
			format: 'cjs',
			preserveModules: true,
			entryFileNames: '[name].cjs',
		},
	},
	{
		...config,
		plugins: [dts()],
		output: {
			dir: 'dist',
			preserveModules: true,
		},
	},
];
