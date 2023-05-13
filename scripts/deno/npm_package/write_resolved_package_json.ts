/**
 * Handles the use of `workspace:*`-style versions for dependencies in the same
 * workspace (https://pnpm.io/workspaces). `pnpm` resolves them to the real path
 * when running `pnpm publish` or `pnpm pack`, but because we're doing some
 * slightly unorthodox stuff with Nx and changesets in the release process, we
 * need these pre-resolved in the build output.
 */

import { gunzip } from 'https://deno.land/x/compress@v0.4.4/mod.ts';
import { Untar } from 'https://deno.land/std@0.187.0/archive/untar.ts';
import { ensureFile } from 'https://deno.land/std@0.187.0/fs/ensure_file.ts';
import { copy } from 'https://deno.land/std@0.187.0/streams/copy.ts';

export const write_resolved_package_json = async ({
	src_dir,
	out_dir,
}: {
	out_dir: string;
	src_dir: string;
}) => {
	// `pnpm pack` the source package, into the output directory
	const cmd = ['corepack', 'pnpm', 'pack', '--pack-destination', out_dir];
	let pack = Deno.run({
		cmd,
		cwd: src_dir,
		stdout: 'piped',
		stderr: 'piped',
	});
	const tarball_path = new TextDecoder().decode(await pack.output()).trim();

	// get the data from the tarball
	const tarball_data = await Deno.readFile(tarball_path);
	const unzipped_tarball = gunzip(tarball_data);
	const contents = new Untar(new Deno.Buffer(unzipped_tarball));

	// extract and copy the package.json data to the build package.json
	for await (const file of contents) {
		if (file.fileName === 'package/package.json') {
			const out_path = `${out_dir}/package.json`;
			await ensureFile(out_path);
			const pkg_json = await Deno.open(out_path, { write: true });
			await copy(file, pkg_json);
		}
	}

	// remove the tarball
	await Deno.remove(tarball_path);
};
