/* eslint-disable import/no-default-export -- Terrazzo expects config as default export */
import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';
import { makeCSSVar } from '@terrazzo/token-tools/css';

const themes = [
	'core',
	'core-alt',
	'core-support',
	'culture',
	'lifestyle',
	'news',
	'opinion',
	'sport',
];

const modes = ['light', 'dark'];

const config: ReturnType<typeof defineConfig> = defineConfig({
	tokens: ['src/pulse.resolver.json'],
	outDir: './dist',
	plugins: [
		css({
			filename: 'pulse.css',
			variableName: (token) => makeCSSVar(token.id, { prefix: 'pulse' }),
			// Temporarily exclude tokens that have not been defined for all themes
			exclude: [
				'mode.light.color.fill.accent.tertiary',
				'mode.light.color.surface.accent.tertiary',
				'mode.dark.color.fill.accent.tertiary',
				'mode.dark.color.surface.accent.tertiary',
				'mode.dark.color.icon.accent.primary-copy',
				'mode.dark.color.icon.accent.primary-inverse-copy',
				'mode.light.color.icon.accent.primary-copy',
				'mode.light.color.icon.accent.primary-inverse-copy',
			],
			permutations: [
				{
					input: {},
					exclude: ['mode.**', 'color.**', 'border.**'],
					prepare: (contents) => `:root {\n  ${contents}\n}`,
				},
				...themes.map((theme) => ({
					input: { theme },
					include: ['mode.**'],
					prepare: (contents: string) =>
						`[data-pulse-theme="${theme}"] {\n  ${contents}\n}`,
				})),
				...modes.map((mode) => ({
					input: { mode },
					include: ['color.**', 'border.**'],
					prepare: (contents: string) =>
						`[data-pulse-mode="${mode}"] {\n  ${contents}\n}`,
				})),
			],
		}),
	],
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
