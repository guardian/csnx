/* eslint-disable import/no-default-export -- Terrazzo expects config as default export */
import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';

const config: ReturnType<typeof defineConfig> = defineConfig({
	tokens: ['pulse.resolver.json'],
	plugins: [
		css({
			filename: 'pulse.css',
		}),
	],
	outDir: './dist',
	lint: {
		build: { enabled: true },
		rules: {
			'core/valid-color': 'error',
			'core/valid-dimension': 'error',
			'core/valid-font-family': 'error',
			'core/valid-font-weight': 'error',
			'core/valid-duration': 'error',
			'core/valid-cubic-bezier': 'error',
			'core/valid-number': 'error',
			'core/valid-link': 'error',
			'core/valid-boolean': 'error',
			'core/valid-string': 'error',
			'core/valid-stroke-style': 'error',
			'core/valid-border': 'error',
			'core/valid-transition': 'error',
			'core/valid-shadow': 'error',
			'core/valid-gradient': 'error',
			'core/valid-typography': 'error',
			// 'core/consistent-naming': 'warn',
			'core/required-typography-properties': 'error',
		},
	},
});

export default config;
