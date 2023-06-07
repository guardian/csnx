import { require } from 'https://deno.land/x/require@1.0.0/mod.ts';

type Options = {
	outDir: string;
	entries?: {
		cjs: string;
		esm: string;
	};
};

/**
 * Sets some defaults in the package.json and removes things we
 * don't want to publish.
 */
export async function setPackageDefaults({ outDir, entries }: Options) {
	const pkg = await require(`${outDir}/package.json`);

	delete pkg.pnpm;
	delete pkg.packageManager;
	delete pkg.scripts;
	delete pkg.devDependencies;

	const pkgDefaults = {
		license: 'MIT',
		readme: 'README.md',
		homepage: `https://github.com/guardian/csnx/tree/main/${options.pkgRoot}#readme`,
		bugs: {
			url: 'https://github.com/guardian/csnx/issues',
		},
		repository: {
			type: 'git',
			url: 'git+https://github.com/guardian/csnx.git',
		},
	};

	if (!pkg.private) {
		pkg.publishConfig = {
			access: 'public',
		};
	}

	if (entries) {
		pkgDefaults.main = entries.cjs;
		pkgDefaults.module = entries.esm;
	} else if (!pkg.main) {
		throw new Error(
			"You must add a 'main' field to your package.json, or pass an 'entry' option to the build executor",
		);
	}

	const sortedPkg = sortPkgJson({
		...pkgDefaults,
		...pkg,
	}) as JsonObject;

	await writePackage(path.join(options.outputPath, 'package.json'), sortedPkg);
}
