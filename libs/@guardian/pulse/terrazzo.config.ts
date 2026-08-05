import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import cssInJs from '@terrazzo/plugin-css-in-js';
import js from '@terrazzo/plugin-js';

const variableName = (token: { id: string }) =>
	`--pulse-${token.id.replace(/\./g, '-')}`;

export default defineConfig({
	tokens: ['tokens/pulse.resolver.json'],
	plugins: [
		css({
			filename: 'colour.css',
			include: ['colour.**'],
			variableName,
		}),
		css({
			filename: 'padding.css',
			include: ['padding.**'],
			variableName,
		}),
		css({
			filename: 'radius.css',
			include: ['radius.**'],
			variableName,
		}),
		css({
			filename: 'space.css',
			include: ['space.**'],
			variableName,
		}),
		css({
			filename: 'typography.css',
			include: ['typography.**'],
			variableName,
		}),
		cssInJs(),
		js(),
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
