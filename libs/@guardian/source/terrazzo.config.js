import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import js from '@terrazzo/plugin-js';

/** @type {import('@terrazzo/cli').Config} */
const config = defineConfig({
	tokens: ['./src/design-tokens/tokens.new.json'],
	outDir: './src/design-tokens/tokens/',

	plugins: [
		css(),
		js({
			js: 'index.js',
			ts: 'index.d.ts',
			json: false,
		}),
	],

	lint: {
		rules: {},
	},
});

export default config;
