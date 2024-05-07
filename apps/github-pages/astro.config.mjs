import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
	site: 'https://guardian.github.io',
	base: '/csnx',
	integrations: [svelte()],
});
