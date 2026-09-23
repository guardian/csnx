/* eslint-disable import/no-default-export -- Terrazzo expects config as default export */
import { defineConfig } from '@terrazzo/cli';
import css from '@terrazzo/plugin-css';

const config: ReturnType<typeof defineConfig> = defineConfig({
	tokens: ['pulse.resolver.json'],
	plugins: [
		css({
			filename: 'pulse.css',
			permutations: [
				{
					input: {}, // default
					exclude: ['mode.**', 'color.**'],
					prepare: (contents) => `:root {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'core' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="core"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'core-alt' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="core-alt"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'core-support' },
					include: ['mode.**'],
					prepare: (contents) =>
						`[data-brand="core-support"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'culture' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="culture"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'lifestyle' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="lifestyle"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'news' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="news"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'opinion' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="opinion"] {\n  ${contents}\n}`,
				},
				{
					input: { theme: 'sport' },
					include: ['mode.**'],
					prepare: (contents) => `[data-brand="sport"] {\n  ${contents}\n}`,
				},
				{
					input: { mode: 'light' },
					include: ['color.**', 'border.**'],
					prepare: (contents) => `[data-mode="light"] {\n  ${contents}\n}`,
				},
				{
					input: { mode: 'dark' },
					include: ['color.**', 'border.**'],
					prepare: (contents) => `[data-mode="dark"] {\n  ${contents}\n}`,
				},
			],
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
