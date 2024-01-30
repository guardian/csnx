import { ThemeProvider } from '@emotion/react';
import { Decorator } from '@storybook/react';

export const ThemeProviderDecorator: Decorator = (storyFn, context) => {
	const theme = context.parameters.theme;
	return theme ? (
		<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
	) : (
		<>{storyFn()}</>
	);
};
