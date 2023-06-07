import { resolve } from 'https://deno.land/std@0.187.0/path/mod.ts';
import type { CompilerOptions } from 'npm:typescript@4.9.5';

export async function getCompilerOptions({
	srcDir,
}: {
	srcDir: string;
}): CompilerOptions {
	const tsconfigPath = resolve(srcDir, 'tsconfig.json');

	if (tsconfigPath) {
		const tsconfigFile = await Deno.readTextFile(tsconfigPath);
		const { compilerOptions } = JSON.parse(tsconfigFile);
		return compilerOptions ?? {};
	}

	return {};
}
