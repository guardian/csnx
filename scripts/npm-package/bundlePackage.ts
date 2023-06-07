import { getRollupConfig } from './getRollupConfig.ts';
import type { CompilerOptions } from 'npm:typescript@4.9.5';

export const formats = ['cjs', 'esm'] as const;
export type Entries = {
	[K in typeof formats[number]]: string;
};

export default async function bundlePackage({
	srcDir,
	outDir,
	compilerOptions,
}: {
	srcDir: string;
	outDir: string;
	compilerOptions: CompilerOptions;
}) {
	let entries: Entries | undefined;

	const cjsConfig = getRollupConfig({ outDir, format: 'cjs', compilerOptions });
	const esmConfig = getRollupConfig({ outDir, format: 'esm', compilerOptions });

	console.log(cjsConfig);
	console.log(esmConfig);
}
