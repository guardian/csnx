import { mergeThemes } from './themes';

type ThemeNew = {
	text: string;
	border: string;
	highlight: string;
};

const themeDefault = {
	text: 'black',
	border: 'red',
	highlight: 'hotpink',
};

const providerTheme = {
	text: 'black',
	border: 'green',
};

type ProviderTheme = typeof providerTheme | undefined;

export const transformProviderTheme = (
	providerTheme: ProviderTheme,
): Partial<ThemeNew> => {
	const transformedTheme: Partial<ThemeNew> = {};

	if (providerTheme?.border) {
		transformedTheme.highlight = providerTheme.border;
	}
	return { ...transformedTheme, ...providerTheme };
};

describe('mergeThemes', () => {
	it('returns default theme untouched if no theme overrides or provider theme', () => {
		const mergedTheme = mergeThemes<ThemeNew, ProviderTheme>(
			themeDefault,
			undefined,
			undefined,
		);
		expect(mergedTheme).toStrictEqual({
			text: 'black',
			border: 'red',
			highlight: 'hotpink',
		});
	});

	it('merges theme provider theme with default theme', () => {
		const mergedTheme = mergeThemes<ThemeNew, ProviderTheme>(
			themeDefault,
			undefined,
			providerTheme,
		);
		expect(mergedTheme).toStrictEqual({
			text: 'black',
			border: 'green',
			highlight: 'hotpink',
		});
	});

	it('transforms and merges theme provider theme with default theme', () => {
		const mergedTheme = mergeThemes<ThemeNew, ProviderTheme>(
			themeDefault,
			undefined,
			providerTheme,
			transformProviderTheme,
		);
		expect(mergedTheme).toStrictEqual({
			text: 'black',
			border: 'green',
			highlight: 'green',
		});
	});

	it('merges theme overrides with default theme', () => {
		const mergedTheme = mergeThemes<ThemeNew, ProviderTheme>(
			themeDefault,
			{ highlight: 'yellow' },
			undefined,
		);
		expect(mergedTheme).toStrictEqual({
			text: 'black',
			border: 'red',
			highlight: 'yellow',
		});
	});
});
