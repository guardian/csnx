import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import cssInJs from '@terrazzo/plugin-css-in-js';
import typography from './terrazzo/plugins/typgraphy';

const variableName = (token: { id: string }) =>
	`--pulse-${token.id.replace(/\./g, '-')}`;

export default defineConfig({
	tokens: ['tokens/pulse.resolver.json'],
	plugins: [
		css({
			filename: 'pulse.css',
			variableName,
		}),
		typography({
			filename: 'typography.js',
		}),
	],
	outDir: './dist/',
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
			'core/consistent-naming': 'warn',
		},
	},
});
