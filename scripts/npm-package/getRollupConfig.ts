import { formats } from './bundlePackage.ts';
import { nodeResolve } from 'npm:@rollup/plugin-node-resolve@14.0.1';
import commonjs from 'npm:@rollup/plugin-commonjs@22.0.2';
import ts from 'npm:rollup-plugin-ts@3.0.2';
import json from 'npm:@rollup/plugin-json@4.1.0';
import type { CompilerOptions } from 'npm:typescript@4.9.5';

export function getRollupConfig({
	outDir,
	format,
	compilerOptions,
}: {
	outDir: string;
	format: typeof formats[number];
	compilerOptions: CompilerOptions;
}) {
	if (format === 'cjs') {
		// Node 14 is eol 2023-04-30, so we should still support it
		compilerOptions.target = 'ES2018';
	}

	return {
		output: {
			dir: `${outDir}/${format}`,
			format,
			sourcemap: true,
			preserveModules: true,
		},
		plugins: [
			nodeResolve({
				extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js', '.json'],
			}),
			ts({
				tsconfig: compilerOptions,
			}),
			json(),
			commonjs(),
		],
	};
}
