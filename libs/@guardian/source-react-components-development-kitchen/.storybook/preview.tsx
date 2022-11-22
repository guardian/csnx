import { backgrounds } from './preview/backgrounds';
import { FocusManagerDecorator } from './preview/FocusManagerDecorator';
import { ThemeProviderDecorator } from './preview/ThemeProviderDecorator';
import { viewport } from './preview/viewport';

export const parameters = {
	viewport,
	backgrounds,
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: {
			order: [
				'Source',
				'Foundations',
				'Components',
				'Development Kitchen',
				'Packages',
			],
			method: 'alphabetical',
		},
	},
};

export const decorators = [FocusManagerDecorator, ThemeProviderDecorator];
