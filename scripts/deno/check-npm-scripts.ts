/**
 * Runs all npm-scripts in the workspace one at a time, with no caching or old build files in place.
 *
 * This should help pinpoint eny issues with how we've orchestrated running them, defined dependent tasks etc.
 */

import { exists } from 'https://deno.land/std@0.224.0/fs/exists.ts';
import * as colors from 'https://deno.land/std@0.224.0/fmt/colors.ts';
import { expandGlob } from 'https://deno.land/std@0.224.0/fs/expand_glob.ts';
import { existsSync } from 'https://deno.land/std@0.224.0/fs/exists.ts';

interface Package {
	path: string;
	scripts: { [key: string]: string };
}

interface ErrorLog {
	packageName: string;
	script: string;
	error: string;
}

async function getWorkspacePackages(): Promise<Package[]> {
	const command = new Deno.Command('pnpm', {
		args: ['-r', 'ls', '--json'],
	});
	const { code: _code, stdout } = await command.output();
	const result = new TextDecoder().decode(stdout);

	const packages = JSON.parse(result) as { path: string }[];
	const packageDetails: Package[] = [];

	for (const pkg of packages) {
		const packageJsonPath = `${pkg.path}/package.json`;
		if (await exists(packageJsonPath)) {
			const packageJson = JSON.parse(await Deno.readTextFile(packageJsonPath));
			if (packageJson.scripts) {
				packageDetails.push({
					path: pkg.path,
					scripts: packageJson.scripts,
				});
			}
		}
	}

	return packageDetails;
}

async function deleteDirs(name: string) {
	const distDirectories = expandGlob(`**/${name}`, {
		globstar: true,
		exclude: ['**/node_modules/**'],
	});

	for await (const distDir of distDirectories) {
		if (distDir.isDirectory && existsSync(distDir.path)) {
			console.log(`Removing directory: ${distDir.path}`);
			try {
				await Deno.remove(distDir.path, { recursive: true });
				console.log(`Successfully removed: ${distDir.path}`);
			} catch (error) {
				console.error(`Failed to remove: ${distDir.path}`);
				console.error(error);
			}
		}
	}
}

async function runNpmScript(pkgPath: string, script: string) {
	// Skip these scripts as they are long-running
	if (
		['dev', 'start', 'storybook', 'create-icons', 'update-readme'].includes(
			script,
		)
	) {
		return { result: 'skipping', error: '' };
	}

	const command = new Deno.Command('pnpm', {
		args: ['run', script],
		cwd: pkgPath,
	});
	const { success, stdout, stderr } = await command.output();
	if (success) {
		return new TextDecoder().decode(stdout);
	}
	throw new Error(new TextDecoder().decode(stderr));
}

async function main() {
	const packages = await getWorkspacePackages();
	const errorLogs: ErrorLog[] = [];

	for (const pkg of packages) {
		for (const [scriptName] of Object.entries(pkg.scripts)) {
			console.log(`Removing wireit caches`);
			await deleteDirs('.wireit');

			console.log(`Removing dist folders`);
			await deleteDirs('dist');

			try {
				console.log(`Running ${scriptName} in ${pkg.path}`);
				await runNpmScript(pkg.path, scriptName);
				console.log(
					colors.green(`Successfully ran ${scriptName} in ${pkg.path}`),
				);
			} catch (error) {
				console.log(colors.red(`Failed to run ${scriptName} in ${pkg.path}`));
				console.error(error.message);

				errorLogs.push({
					packageName: pkg.path,
					script: scriptName,
					error: error.message,
				});
			}
			console.log('');
		}
	}

	if (errorLogs.length > 0) {
		console.log(`\n ${errorLogs.length} scripts failed:`);
		for (const log of errorLogs) {
			console.log(`Package: ${log.packageName}`);
			console.log(`Script: ${log.script}`);
			console.log(`Error: ${log.error}\n`);
		}
	} else {
		console.log('All scripts ran successfully.');
	}
}

if (import.meta.main) {
	await main();
}
