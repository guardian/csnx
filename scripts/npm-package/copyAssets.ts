import { expandGlob } from 'https://deno.land/std@0.187.0/fs/mod.ts';
import { rootDir } from '../lib/dirs.ts';

/**
 * Copies assets to the dist directory.
 *
 * Used for things that won't be included by bundling but which you want present
 * in the final package.
 *
 * @param glob a glob pattern
 */
export async function copyAssets(assets: string) {
	for (const glob of assets.split(',')) {
		for await (const file of expandGlob(glob, {
			includeDirs: false,
		})) {
			await Deno.copyFile(
				file.path,
				file.path.replace(rootDir, `${rootDir}/dist`),
			);
		}
	}
}
