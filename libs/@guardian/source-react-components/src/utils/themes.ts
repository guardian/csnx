/**
 * Combine values from default theme with theme overrides from `theme` prop
 * and deprecated `ThemeProvider` themes. Optionally pass `ThemeProvider` theme
 * though transform function to map theme keys from old to new format.
 */

export const mergeThemes = <ComponentTheme, ProviderTheme>(
	defaultTheme: ComponentTheme,
	themeOverrides: Partial<ComponentTheme> | undefined,
	providerTheme: ProviderTheme,
	transform?: (providerTheme: ProviderTheme) => Partial<ComponentTheme>,
): ComponentTheme => ({
	...defaultTheme,
	...(transform ? transform(providerTheme) : {}),
	...themeOverrides,
});
