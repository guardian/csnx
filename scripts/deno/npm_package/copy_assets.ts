import { expandGlob } from 'https://deno.land/std@0.186.0/fs/mod.ts';
import { root_dir } from '../dirs.ts';

/**
 * Copies assets to the dist directory.
 *
 * Used for things that won't be included by bundling but which you want present
 * in the final package.
 *
 * @param glob a glob pattern
 */
export const copy_assets = async (glob: string) => {
	for await (const file of expandGlob(glob, {
		includeDirs: false,
	})) {
		await Deno.copyFile(
			file.path,
			file.path.replace(root_dir, `${root_dir}/dist`),
		);
	}
};
