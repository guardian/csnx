/* eslint-disable import/no-default-export -- it's what rollup wants */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import pkg from '../package.json';

export default {
	input: './src/index.ts',
	external: (id) => !/^[./]/.test(id),
	output: [
		{
			file: pkg.main,
			format: 'cjs',
		},
		{
			file: pkg.module,
			format: 'esm',
		},
	],
	plugins: [
		typescript(),
		css(),
		resolve(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
			__PACKAGE_VERSION__: JSON.stringify(pkg.version),
		}),
		commonjs(),
		process.env.NODE_ENV === 'production' &&
			strip({
				include: ['**/*.{j,t}s?(x)'],
				exclude: ['index.*'],
				sourceMap: true,
			}),
	].filter(Boolean),
	watch: {
		clearScreen: false,
	},
};
