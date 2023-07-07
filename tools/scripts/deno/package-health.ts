import { package_health } from 'https://deno.land/x/package_health@0.5.1/src/main.ts';
import { walk } from 'https://deno.land/std@0.193.0/fs/mod.ts';
import {
	dirname,
	fromFileUrl,
	globToRegExp,
	resolve,
} from 'https://deno.land/std@0.193.0/path/mod.ts';

const root = resolve(dirname(fromFileUrl(import.meta.url)), '..', '..', '..');

let errors = 0;

for await (const { path } of walk(root, {
	includeDirs: false,
	match: [
		globToRegExp(root + '/package.json'),
		globToRegExp(root + '/apps/**/package.json', { globstar: true }),
		globToRegExp(root + '/libs/**/package.json', { globstar: true }),
	],
})) {
	const contents = JSON.parse(await Deno.readTextFile(path));
	errors += await package_health(contents, { verbose: true });

	console.log('\n');
}

if (errors > 0) {
	console.info(`There are ${errors} issues with \`package.json\` files…`);
	Deno.exit(1);
}
