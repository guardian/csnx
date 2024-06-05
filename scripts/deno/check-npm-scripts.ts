/**
 * Runs all npm-scripts in the workspace one at a time, with no caching or old build files in place.
 *
 * This should help pinpoint eny issues with how we've orchestrated running them, defined dependent tasks etc.
 *
 * If you only want to run a specific package, you can pass the package name as an argument, e.g.
 *
 * ```sh
 * deno run -A scripts/deno/check-npm-scripts.ts @guardian/libs
 * ```
 */

import { exists } from 'https://deno.land/std@0.224.0/fs/exists.ts';
import * as fmt from 'https://deno.land/std@0.224.0/fmt/colors.ts';
import { expandGlob } from 'https://deno.land/std@0.224.0/fs/expand_glob.ts';
import { existsSync } from 'https://deno.land/std@0.224.0/fs/exists.ts';
import { relative } from 'https://deno.land/std@0.224.0/path/mod.ts';

interface Package {
	path: string;
	scripts: { [key: string]: string };
}

interface ErrorLog {
	packageName: string;
	script: string;
	error: string;
}

async function getWorkspacePackages(pkgName: string | undefined) {
	try {
		const command = new Deno.Command('pnpm', {
			args: [...(pkgName ? [`--filter`, pkgName] : ['-r']), 'ls', '--json'],
		});
		const { success, stderr, stdout } = await command.output();

		if (!success) {
			throw new Error(new TextDecoder().decode(stderr));
		}

		const result = new TextDecoder().decode(stdout);

		const packages = JSON.parse(result) as { path: string }[];
		const packageDetails: Package[] = [];

		for (const pkg of packages) {
			const packageJsonPath = `${pkg.path}/package.json`;
			if (await exists(packageJsonPath)) {
				const packageJson = JSON.parse(
					await Deno.readTextFile(packageJsonPath),
				);
				if (packageJson.scripts) {
					packageDetails.push({
						path: pkg.path,
						scripts: packageJson.scripts,
					});
				}
			}
		}

		return packageDetails;
	} catch (error) {
		console.error('Failed to get workspace packages');
		console.error(error);
	}
}

async function deleteDirs(dirName: string) {
	const distDirectories = expandGlob(`**/${dirName}`, {
		globstar: true,
		exclude: ['**/node_modules/**'],
	});

	for await (const distDir of distDirectories) {
		if (distDir.isDirectory && existsSync(distDir.path)) {
			const relativePath = relative(Deno.cwd(), distDir.path);
			try {
				await Deno.remove(distDir.path, { recursive: true });
				console.log(fmt.green('✓') + fmt.dim(` deleted ${relativePath}`));
			} catch (error) {
				console.error(`Failed to remove: ${relativePath}`);
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

async function main(pkgName: string | undefined) {
	const packages = (await getWorkspacePackages(pkgName)) ?? [];
	const errorLogs: ErrorLog[] = [];

	for (const pkg of packages) {
		for (const [scriptName] of Object.entries(pkg.scripts)) {
			console.log(`Cleaning wireit caches...`);
			await deleteDirs('.wireit');

			console.log(`Cleaning dist folders...`);
			await deleteDirs('dist');

			const relativePath = [relative(Deno.cwd(), pkg.path), 'package.json']
				.filter(Boolean)
				.join('/');

			try {
				console.log(
					`Running ${fmt.blue(scriptName)} from ${fmt.cyan(relativePath)}...`,
				);
				await runNpmScript(pkg.path, scriptName);
				console.log(fmt.green('✓') + fmt.dim(` success`));
			} catch (error) {
				console.log(fmt.red(`❌ Failed`));
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
	await main(Deno.args[0]);
}
