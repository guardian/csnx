import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://guardian.github.io',
	base: '/csnx',
	integrations: [svelte()],
});
