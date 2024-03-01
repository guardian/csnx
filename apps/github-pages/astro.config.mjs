import { defineConfig } from 'astro/config';
import tsConfig from '../../tsconfig.base.json';
import path from 'node:path';

import svelte from '@astrojs/svelte';

// duplicate the aliases defined in tsconfig.base.json
let alias = {};
for (const [module, modulePath] of Object.entries(
	tsConfig.compilerOptions.paths,
)) {
	alias[module] = path.resolve('../../' + modulePath[0] + '.ts');
}

// https://astro.build/config
export default defineConfig({
	outDir: '../../dist/apps/github-pages',
	site: 'https://guardian.github.io',
	base: '/csnx',
	integrations: [svelte()],
	vite: {
		resolve: {
			alias,
		},
	},
});
