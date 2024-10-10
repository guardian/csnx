import * as pkgExports from './index';

// this makes sure no type exports have been removed
// it won't catch that new ones have been added, but can anyone?
export type {
	AgeWarningProps,
	ExpandingWrapperProps,
	FileInputProps,
	FooterLinksProps,
	FooterWithContentsProps,
	LineCount,
	LinesProps,
	LogoProps,
	NumericInput,
	NumericInputProps,
	StarRatingProps,
	ToggleSwitchProps,
	ToggleSwitchAppsProps,
} from './index';

it('Should have exactly these exports', () => {
	expect(Object.keys(pkgExports).sort()).toEqual([
		'AgeWarning',
		'DashedLines',
		'Divider',
		'DottedLines',
		'ErrorSummary',
		'ExpandingWrapper',
		'FileInput',
		'FooterLinks',
		'FooterWithContents',
		'InfoSummary',
		'Lines',
		'Logo',
		'NumericInput',
		'SquigglyLines',
		'StarRating',
		'StraightLines',
		'SuccessSummary',
		'Tabs',
		'Ticker',
		'ToggleSwitch',
		'ToggleSwitchApps',
		'defaultGuardianLinks',
		'expandingWrapperDarkTheme',
		'expandingWrapperThemeDefault',
		'fileInputDarkTheme',
		'fileInputThemeDefault',
		'tabsDarkTheme',
		'tabsThemeDefault',
	]);
});
