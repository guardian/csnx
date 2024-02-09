import * as pkgExports from './index';

// this makes sure no type exports have been removed
// it won't catch that new ones have been added, but can anyone?
export type {
	AccordionProps,
	AccordionRowProps,
	ButtonPriority,
	IconSide,
	Size,
	ButtonProps,
	LinkButtonProps,
	CheckboxGroupProps,
	CheckboxProps,
	ChoiceCardGroupProps,
	ChoiceCardColumns,
	ChoiceCardProps,
	FooterProps,
	LabelProps,
	LegendProps,
	ColumnsProps,
	ColumnProps,
	ContainerProps,
	HideProps,
	StackProps,
	TilesProps,
	InlineProps,
	LinkPriority,
	LinkProps,
	ButtonLinkProps,
	RadioGroupProps,
	RadioProps,
	OptionProps,
	SelectProps,
	TextAreaProps,
	TextInputProps,
	UserFeedbackProps,
	IconSize,
	IconProps,
	InputSize,
	SvgGuardianLiveLogoProps,
	SvgGuardianLogoProps,
	SvgRoundelBrandProps,
	SvgRoundelBrandInverseProps,
	SvgRoundelDefaultProps,
	SvgRoundelInverseProps,
	ThemeIcon,
	ThemeAccordion,
	ThemeButton,
	ThemeCheckbox,
	ThemeChoiceCard,
	ThemeChoiceCardGroup,
	ThemeLabel,
	ThemeLink,
	ThemeRadio,
	ThemeRadioGroup,
	ThemeSelect,
	ThemeTextInput,
	ThemeTextArea,
	ThemeUserFeedback,
	Props,
} from './index';

it('Should have exactly these exports', () => {
	console.log(Object.keys(pkgExports).sort());
	expect(Object.keys(pkgExports).sort()).toEqual([
		'Accordion',
		'AccordionRow',
		'BackToTop',
		'Button',
		'ButtonLink',
		'Checkbox',
		'CheckboxGroup',
		'ChoiceCard',
		'ChoiceCardGroup',
		'Column',
		'Columns',
		'Container',
		'Footer',
		'Hide',
		'Inline',
		'InlineError',
		'InlineSuccess',
		'Label',
		'Legend',
		'Link',
		'LinkButton',
		'Option',
		'Radio',
		'RadioGroup',
		'Select',
		'Stack',
		'SvgAlert',
		'SvgAlertPhone',
		'SvgAlertRound',
		'SvgAlertTriangle',
		'SvgAppleBrand',
		'SvgArrowContract',
		'SvgArrowDownStraight',
		'SvgArrowExpand',
		'SvgArrowLeftStraight',
		'SvgArrowOutdent',
		'SvgArrowPopOut',
		'SvgArrowRightStraight',
		'SvgArrowScroll',
		'SvgArrowUpAndDownSmall',
		'SvgArrowUpStraight',
		'SvgArrowUpStraightSmall',
		'SvgAsterisk',
		'SvgAudio',
		'SvgAudioMute',
		'SvgBookMark',
		'SvgBookMarkCross',
		'SvgCalendar',
		'SvgCamera',
		'SvgCheckmark',
		'SvgChevronDownDouble',
		'SvgChevronDownSingle',
		'SvgChevronDownSingleXsmall',
		'SvgChevronLeftDouble',
		'SvgChevronLeftSingle',
		'SvgChevronRightDouble',
		'SvgChevronRightSingle',
		'SvgChevronUpDouble',
		'SvgChevronUpSingle',
		'SvgClock',
		'SvgClockBaselineSmall',
		'SvgCreditCard',
		'SvgCross',
		'SvgCrossRound',
		'SvgCrossedOutCloud',
		'SvgCrosswords',
		'SvgDirectDebit',
		'SvgDirectDebitWide',
		'SvgDocument',
		'SvgDownload',
		'SvgDragHandle',
		'SvgEdit',
		'SvgEllipsis',
		'SvgEnvelope',
		'SvgExclamation',
		'SvgExternal',
		'SvgEye',
		'SvgEyeStrike',
		'SvgFacebook',
		'SvgFacebookBrand',
		'SvgFacebookMessenger',
		'SvgFilter',
		'SvgGift',
		'SvgGlobe',
		'SvgGoogleBrand',
		'SvgGps',
		'SvgGuardianBestWebsiteLogo',
		'SvgGuardianLiveLogo',
		'SvgGuardianLogo',
		'SvgHandPointed',
		'SvgHouse',
		'SvgHouseCross',
		'SvgHousePlus',
		'SvgHouseSetting',
		'SvgIndent',
		'SvgInfo',
		'SvgInfoRound',
		'SvgLinkedIn',
		'SvgLocationMarker',
		'SvgMagnifyingGlass',
		'SvgMagnifyingGlassMinus',
		'SvgMagnifyingGlassPlus',
		'SvgMagnifyingGlassSadFace',
		'SvgMediaControlsBack',
		'SvgMediaControlsForward',
		'SvgMediaControlsPause',
		'SvgMediaControlsPlay',
		'SvgMediaControlsStop',
		'SvgMenu',
		'SvgMessage',
		'SvgMessageRound',
		'SvgMessenger',
		'SvgMinus',
		'SvgMoon',
		'SvgNewsletter',
		'SvgNotificationsOff',
		'SvgNotificationsOn',
		'SvgOfflineCloud',
		'SvgPadlock',
		'SvgPartyOfThree',
		'SvgPayPal',
		'SvgPayPalBrand',
		'SvgPerson',
		'SvgPersonCross',
		'SvgPersonPlus',
		'SvgPersonRound',
		'SvgPersonTick',
		'SvgPhone',
		'SvgPinned',
		'SvgPinterest',
		'SvgPlay',
		'SvgPlus',
		'SvgQuote',
		'SvgReload',
		'SvgRoundelBrand',
		'SvgRoundelBrandInverse',
		'SvgRoundelDefault',
		'SvgRoundelInverse',
		'SvgSettings',
		'SvgShare',
		'SvgShareCallout',
		'SvgSignalBrand',
		'SvgSpeechBubble',
		'SvgSpeechBubbleCross',
		'SvgSpeechBubblePlus',
		'SvgSpinner',
		'SvgStar',
		'SvgStarOutline',
		'SvgTelegramBrand',
		'SvgTextLarge',
		'SvgTextSize',
		'SvgTextSmall',
		'SvgTickRound',
		'SvgTwitter',
		'SvgUpload',
		'SvgVideo',
		'SvgWhatsApp',
		'SvgWhatsAppBrand',
		'TextArea',
		'TextInput',
		'Tiles',
		'accordionThemeDefault',
		'buttonThemeBrand',
		'buttonThemeBrandAlt',
		'buttonThemeDefault',
		'buttonThemeReaderRevenue',
		'buttonThemeReaderRevenueBrand',
		'buttonThemeReaderRevenueBrandAlt',
		'checkboxThemeBrand',
		'checkboxThemeDefault',
		'choiceCardThemeDefault',
		'footerThemeBrand',
		'labelThemeBrand',
		'labelThemeDefault',
		'linkThemeBrand',
		'linkThemeBrandAlt',
		'linkThemeDefault',
		'radioThemeBrand',
		'radioThemeDefault',
		'selectThemeDefault',
		'textInputThemeDefault',
		'themeAccordion',
		'themeBrandLabel',
		'themeButton',
		'themeButtonBrand',
		'themeButtonBrandAlt',
		'themeButtonReaderRevenue',
		'themeButtonReaderRevenueBrand',
		'themeButtonReaderRevenueBrandAlt',
		'themeCheckbox',
		'themeCheckboxBrand',
		'themeChoiceCard',
		'themeLabel',
		'themeLink',
		'themeLinkBrand',
		'themeLinkBrandAlt',
		'themeRadio',
		'themeRadioBrand',
		'themeRadioGroup',
		'themeSelect',
		'themeTextArea',
		'themeTextInput',
		'themeUserFeedback',
		'themeUserFeedbackBrand',
		'userFeedbackThemeBrand',
		'userFeedbackThemeDefault',
	]);
});
