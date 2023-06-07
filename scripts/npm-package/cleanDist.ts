import { ensureDir } from 'https://deno.land/std@0.187.0/fs/ensure_dir.ts';

export async function cleanDist(outDir: string) {
	// Remove the dist directory if it exists (from previous builds)
	try {
		await Deno.remove(outDir, { recursive: true });
	} catch (_error) {
		// do nothing
	}

	// Create a new dist directory for this build
	await ensureDir(outDir);
}
