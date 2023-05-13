/**
 * Creates an NPM package in the dist directory.
 */

import { parse } from 'https://deno.land/std@0.186.0/flags/mod.ts';
import { resolve } from 'https://deno.land/std/path/mod.ts';
import { ensureDir } from 'https://deno.land/std@0.186.0/fs/ensure_dir.ts';
import { copy } from 'https://deno.land/std@0.186.0/fs/copy.ts';
import { exists } from 'https://deno.land/std@0.186.0/fs/mod.ts';
import { root_dir } from '../dirs.ts';
import { copy_assets } from './copy_assets.ts';
import { write_resolved_package_json } from './write_resolved_package_json.ts';

const formats = ['cjs', 'esm'] as const;
export type Entries = {
	[K in typeof formats[number]]: string;
};

const flags = parse(Deno.args, {
	string: ['entry', 'assets'],
	default: {
		entry: 'src/index.ts',
		assets: '',
	},
});

const entry_file = resolve(flags.entry);

if (!(await exists(entry_file))) {
	throw new Error(`Entry file ${entry_file} does not exist.`);
}

const src_dir = Deno.cwd();
const out_dir = src_dir.replace(root_dir, `${root_dir}/dist`);

// Remove the dist directory if it exists (from previous builds)
try {
	await Deno.remove(out_dir, { recursive: true });
} catch (_error) {
	// do nothing
}

// Create a new dist directory for this build
await ensureDir(out_dir);

// Copy assets to the dist directory
for (const glob of flags.assets.split(',')) {
	await copy_assets(glob);
}

// Write the package.json file to the dist directory
await write_resolved_package_json({ src_dir, out_dir });

// remove unwanted fields and set any necessary defaults in the package.json
// await set_package_defaults({ src_dir, out_dir });
