/**
 * Creates an NPM package in the dist directory.
 */

import { parse } from 'https://deno.land/std@0.187.0/flags/mod.ts';
import { resolve } from 'https://deno.land/std@0.187.0/path/mod.ts';
import { exists } from 'https://deno.land/std@0.187.0/fs/mod.ts';
import type { CompilerOptions } from 'npm:typescript@4.9.5';
import { rootDir } from '../lib/dirs.ts';
import { copyAssets } from './copyAssets.ts';
import { writeResolvedPackageJson } from './writeResolvedPackageJson.ts';
import { cleanDist } from './cleanDist.ts';
import bundlePackage from './bundlePackage.ts';
import { getCompilerOptions } from './getCompilerOptions.ts';

const formats = ['cjs', 'esm'] as const;
export type Entries = {
	[K in typeof formats[number]]: string;
};

const flags = parse(Deno.args, {
	string: ['entry', 'assets'],
	default: {
		assets: '',
	},
});

let compilerOptions: CompilerOptions = {};

const entryFile = flags.entry ? resolve(flags.entry) : flags.entry;
const srcDir = Deno.cwd();
const outDir = srcDir.replace(rootDir, `${rootDir}/dist`);

if (entryFile) {
	if (!(await exists(entryFile))) {
		throw new Error(`Entry file ${entryFile} does not exist.`);
	}
	if (entryFile.endsWith('.ts')) {
		compilerOptions = await getCompilerOptions({ srcDir });
	}
}

// (re)Create the dist directory
await cleanDist(outDir);

// Copy assets to the dist directory
await copyAssets(flags.assets);

// Bundle the package
bundlePackage({
	srcDir,
	outDir,
});

// Write the package.json file to the dist directory
// await writeResolvedPackageJson({ srcDir, outDir });

// remove unwanted fields and set any necessary defaults in the package.json
// await set_package_defaults({ src_dir, out_dir });
