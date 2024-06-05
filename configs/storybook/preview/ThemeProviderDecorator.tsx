/* eslint-disable @typescript-eslint/no-unsafe-assignment -- storybook type contains `any`s */

import { ThemeProvider } from '@emotion/react';
import type { Decorator } from '@storybook/react';

export const ThemeProviderDecorator: Decorator = (storyFn, context) => {
	const theme = context.parameters.theme;
	return theme ? (
		<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
	) : (
		<>{storyFn()}</>
	);
};
