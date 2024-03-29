import { palette } from '@guardian/source-foundations';
import type { Meta, StoryFn } from '@storybook/react';
import { SvgAlertPhone } from '../../vendor/icons/SvgAlertPhone';
import { SvgAlertRound } from '../../vendor/icons/SvgAlertRound';
import { SvgAlertTriangle } from '../../vendor/icons/SvgAlertTriangle';
import { SvgAppleBrand } from '../../vendor/icons/SvgAppleBrand';
import { SvgArrowContract } from '../../vendor/icons/SvgArrowContract';
import { SvgArrowDownStraight } from '../../vendor/icons/SvgArrowDownStraight';
import { SvgArrowExpand } from '../../vendor/icons/SvgArrowExpand';
import { SvgArrowLeftStraight } from '../../vendor/icons/SvgArrowLeftStraight';
import { SvgArrowOutdent } from '../../vendor/icons/SvgArrowOutdent';
import { SvgArrowPopOut } from '../../vendor/icons/SvgArrowPopOut';
import { SvgArrowRightStraight } from '../../vendor/icons/SvgArrowRightStraight';
import { SvgArrowScroll } from '../../vendor/icons/SvgArrowScroll';
import { SvgArrowUpAndDownSmall } from '../../vendor/icons/SvgArrowUpAndDownSmall';
import { SvgArrowUpStraight } from '../../vendor/icons/SvgArrowUpStraight';
import { SvgArrowUpStraightSmall } from '../../vendor/icons/SvgArrowUpStraightSmall';
import { SvgAsterisk } from '../../vendor/icons/SvgAsterisk';
import { SvgAudio } from '../../vendor/icons/SvgAudio';
import { SvgAudioMute } from '../../vendor/icons/SvgAudioMute';
import { SvgBin } from '../../vendor/icons/SvgBin';
import { SvgBookMark } from '../../vendor/icons/SvgBookMark';
import { SvgBookMarkCross } from '../../vendor/icons/SvgBookMarkCross';
import { SvgCalendar } from '../../vendor/icons/SvgCalendar';
import { SvgCamera } from '../../vendor/icons/SvgCamera';
import { SvgCheckmark } from '../../vendor/icons/SvgCheckmark';
import { SvgChevronDownDouble } from '../../vendor/icons/SvgChevronDownDouble';
import { SvgChevronDownSingle } from '../../vendor/icons/SvgChevronDownSingle';
import { SvgChevronDownSingleXsmall } from '../../vendor/icons/SvgChevronDownSingleXsmall';
import { SvgChevronLeftDouble } from '../../vendor/icons/SvgChevronLeftDouble';
import { SvgChevronLeftSingle } from '../../vendor/icons/SvgChevronLeftSingle';
import { SvgChevronRightDouble } from '../../vendor/icons/SvgChevronRightDouble';
import { SvgChevronRightSingle } from '../../vendor/icons/SvgChevronRightSingle';
import { SvgChevronUpDouble } from '../../vendor/icons/SvgChevronUpDouble';
import { SvgChevronUpSingle } from '../../vendor/icons/SvgChevronUpSingle';
import { SvgClock } from '../../vendor/icons/SvgClock';
import { SvgClockBaselineSmall } from '../../vendor/icons/SvgClockBaselineSmall';
import { SvgCreditCard } from '../../vendor/icons/SvgCreditCard';
import { SvgCross } from '../../vendor/icons/SvgCross';
import { SvgCrossedOutCloud } from '../../vendor/icons/SvgCrossedOutCloud';
import { SvgCrossRound } from '../../vendor/icons/SvgCrossRound';
import { SvgCrosswords } from '../../vendor/icons/SvgCrosswords';
import { SvgDirectDebit } from '../../vendor/icons/SvgDirectDebit';
import { SvgDirectDebitWide } from '../../vendor/icons/SvgDirectDebitWide';
import { SvgDocument } from '../../vendor/icons/SvgDocument';
import { SvgDownload } from '../../vendor/icons/SvgDownload';
import { SvgDragHandle } from '../../vendor/icons/SvgDragHandle';
import { SvgEdit } from '../../vendor/icons/SvgEdit';
import { SvgEllipsis } from '../../vendor/icons/SvgEllipsis';
import { SvgEnvelope } from '../../vendor/icons/SvgEnvelope';
import { SvgExclamation } from '../../vendor/icons/SvgExclamation';
import { SvgExternal } from '../../vendor/icons/SvgExternal';
import { SvgEye } from '../../vendor/icons/SvgEye';
import { SvgEyeStrike } from '../../vendor/icons/SvgEyeStrike';
import { SvgFacebook } from '../../vendor/icons/SvgFacebook';
import { SvgFacebookBrand } from '../../vendor/icons/SvgFacebookBrand';
import { SvgFacebookMessenger } from '../../vendor/icons/SvgFacebookMessenger';
import { SvgFilter } from '../../vendor/icons/SvgFilter';
import { SvgGift } from '../../vendor/icons/SvgGift';
import { SvgGlobe } from '../../vendor/icons/SvgGlobe';
import { SvgGoogleBrand } from '../../vendor/icons/SvgGoogleBrand';
import { SvgGps } from '../../vendor/icons/SvgGps';
import { SvgHandPointed } from '../../vendor/icons/SvgHandPointed';
import { SvgHouse } from '../../vendor/icons/SvgHouse';
import { SvgHouseCross } from '../../vendor/icons/SvgHouseCross';
import { SvgHousePlus } from '../../vendor/icons/SvgHousePlus';
import { SvgHouseSetting } from '../../vendor/icons/SvgHouseSetting';
import { SvgIndent } from '../../vendor/icons/SvgIndent';
import { SvgInfoRound } from '../../vendor/icons/SvgInfoRound';
import { SvgLinkedIn } from '../../vendor/icons/SvgLinkedIn';
import { SvgLocationMarker } from '../../vendor/icons/SvgLocationMarker';
import { SvgMagnifyingGlass } from '../../vendor/icons/SvgMagnifyingGlass';
import { SvgMagnifyingGlassMinus } from '../../vendor/icons/SvgMagnifyingGlassMinus';
import { SvgMagnifyingGlassPlus } from '../../vendor/icons/SvgMagnifyingGlassPlus';
import { SvgMagnifyingGlassSadFace } from '../../vendor/icons/SvgMagnifyingGlassSadFace';
import { SvgMediaControlsBack } from '../../vendor/icons/SvgMediaControlsBack';
import { SvgMediaControlsForward } from '../../vendor/icons/SvgMediaControlsForward';
import { SvgMediaControlsPause } from '../../vendor/icons/SvgMediaControlsPause';
import { SvgMediaControlsPlay } from '../../vendor/icons/SvgMediaControlsPlay';
import { SvgMediaControlsStop } from '../../vendor/icons/SvgMediaControlsStop';
import { SvgMenu } from '../../vendor/icons/SvgMenu';
import { SvgMessage } from '../../vendor/icons/SvgMessage';
import { SvgMessageRound } from '../../vendor/icons/SvgMessageRound';
import { SvgMinus } from '../../vendor/icons/SvgMinus';
import { SvgMoon } from '../../vendor/icons/SvgMoon';
import { SvgNewsletter } from '../../vendor/icons/SvgNewsletter';
import { SvgNotificationsOff } from '../../vendor/icons/SvgNotificationsOff';
import { SvgNotificationsOffRound } from '../../vendor/icons/SvgNotificationsOffRound';
import { SvgNotificationsOn } from '../../vendor/icons/SvgNotificationsOn';
import { SvgNotificationsOnRound } from '../../vendor/icons/SvgNotificationsOnRound';
import { SvgPadlock } from '../../vendor/icons/SvgPadlock';
import { SvgPartyOfThree } from '../../vendor/icons/SvgPartyOfThree';
import { SvgPayPalBrand } from '../../vendor/icons/SvgPayPalBrand';
import { SvgPerson } from '../../vendor/icons/SvgPerson';
import { SvgPersonCross } from '../../vendor/icons/SvgPersonCross';
import { SvgPersonPlus } from '../../vendor/icons/SvgPersonPlus';
import { SvgPersonRound } from '../../vendor/icons/SvgPersonRound';
import { SvgPersonTick } from '../../vendor/icons/SvgPersonTick';
import { SvgPhone } from '../../vendor/icons/SvgPhone';
import { SvgPinned } from '../../vendor/icons/SvgPinned';
import { SvgPinterest } from '../../vendor/icons/SvgPinterest';
import { SvgPlus } from '../../vendor/icons/SvgPlus';
import { SvgQuote } from '../../vendor/icons/SvgQuote';
import { SvgReload } from '../../vendor/icons/SvgReload';
import { SvgSettings } from '../../vendor/icons/SvgSettings';
import { SvgShare } from '../../vendor/icons/SvgShare';
import { SvgShareCallout } from '../../vendor/icons/SvgShareCallout';
import { SvgSignalBrand } from '../../vendor/icons/SvgSignalBrand';
import { SvgSpeechBubble } from '../../vendor/icons/SvgSpeechBubble';
import { SvgSpeechBubbleCross } from '../../vendor/icons/SvgSpeechBubbleCross';
import { SvgSpeechBubblePlus } from '../../vendor/icons/SvgSpeechBubblePlus';
import { SvgStar } from '../../vendor/icons/SvgStar';
import { SvgStarOutline } from '../../vendor/icons/SvgStarOutline';
import { SvgTelegramBrand } from '../../vendor/icons/SvgTelegramBrand';
import { SvgTextLarge } from '../../vendor/icons/SvgTextLarge';
import { SvgTextSize } from '../../vendor/icons/SvgTextSize';
import { SvgTextSmall } from '../../vendor/icons/SvgTextSmall';
import { SvgTickRound } from '../../vendor/icons/SvgTickRound';
import { SvgTwitter } from '../../vendor/icons/SvgTwitter';
import { SvgUpload } from '../../vendor/icons/SvgUpload';
import { SvgVideo } from '../../vendor/icons/SvgVideo';
import { SvgWhatsApp } from '../../vendor/icons/SvgWhatsApp';
import { SvgWhatsAppBrand } from '../../vendor/icons/SvgWhatsAppBrand';
import type { IconProps, IconSize } from '../@types/Icons';
import { SvgSpinner } from './SvgSpinner';
import type { ThemeIcon } from './theme';

const uiIcons = {
	SvgExclamation,
	SvgAlertRound,
	SvgAlertTriangle,
	SvgAppleBrand,
	SvgArrowDownStraight,
	SvgArrowLeftStraight,
	SvgArrowRightStraight,
	SvgArrowUpStraight,
	SvgChevronDownSingle,
	SvgChevronLeftDouble,
	SvgChevronLeftSingle,
	SvgChevronRightDouble,
	SvgChevronRightSingle,
	SvgChevronUpSingle,
	SvgClock,
	SvgEnvelope,
	SvgExternal,
	SvgEye,
	SvgEyeStrike,
	SvgFacebook,
	SvgFacebookBrand,
	SvgGift,
	SvgGlobe,
	SvgGoogleBrand,
	SvgHouse,
	SvgCheckmark,
	SvgCamera,
	SvgCross,
	SvgLinkedIn,
	SvgFacebookMessenger,
	SvgMessage,
	SvgMessageRound,
	SvgMinus,
	SvgCrossedOutCloud,
	SvgMediaControlsPlay,
	SvgPlus,
	SvgPerson,
	SvgPinned,
	SvgPinterest,
	SvgQuote,
	SvgIndent,
	SvgInfoRound,
	SvgSettings,
	SvgSpeechBubble,
	SvgStar,
	SvgTickRound,
	SvgTwitter,
	SvgAudio,
	SvgVideo,
	SvgWhatsApp,
	SvgWhatsAppBrand,
	SvgAlertPhone,
	SvgArrowContract,
	SvgArrowExpand,
	SvgArrowOutdent,
	SvgArrowPopOut,
	SvgArrowScroll,
	SvgArrowUpAndDownSmall,
	SvgArrowUpStraightSmall,
	SvgAsterisk,
	SvgAudioMute,
	SvgBookMark,
	SvgBookMarkCross,
	SvgCalendar,
	SvgChevronDownDouble,
	SvgChevronDownSingleXsmall,
	SvgChevronUpDouble,
	SvgClockBaselineSmall,
	SvgCrossRound,
	SvgCrosswords,
	SvgDocument,
	SvgDownload,
	SvgDragHandle,
	SvgEdit,
	SvgEllipsis,
	SvgFilter,
	SvgGps,
	SvgHandPointed,
	SvgHouseCross,
	SvgHousePlus,
	SvgHouseSetting,
	SvgLocationMarker,
	SvgMagnifyingGlass,
	SvgMagnifyingGlassMinus,
	SvgMagnifyingGlassPlus,
	SvgMagnifyingGlassSadFace,
	SvgMediaControlsBack,
	SvgMediaControlsForward,
	SvgMediaControlsPause,
	SvgMediaControlsStop,
	SvgMenu,
	SvgMoon,
	SvgNewsletter,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPadlock,
	SvgPartyOfThree,
	SvgPersonCross,
	SvgPersonPlus,
	SvgPersonRound,
	SvgPersonTick,
	SvgPhone,
	SvgReload,
	SvgShare,
	SvgShareCallout,
	SvgSpeechBubbleCross,
	SvgSpeechBubblePlus,
	SvgStarOutline,
	SvgTextLarge,
	SvgTextSize,
	SvgTextSmall,
	SvgUpload,
	SvgSpinner,
	SvgSignalBrand,
	SvgTelegramBrand,
	SvgBin,
	SvgNotificationsOnRound,
	SvgNotificationsOffRound,
};

const paymentIcons = {
	SvgCreditCard,
	SvgDirectDebit,
	SvgPayPal: SvgPayPalBrand,
};

const widePaymentIcons = {
	SvgDirectDebitWide,
};

type IconChromaticStoryArgs = {
	size: IconSize;
	theme: ThemeIcon;
	icons: Array<React.FunctionComponent<IconProps>>;
	isAnnouncedByScreenReader: boolean;
};

const meta: Meta<IconChromaticStoryArgs> = {
	title: 'Icons',
	args: {
		theme: undefined,
		isAnnouncedByScreenReader: false,
		size: 'small',
	},
	argTypes: {
		theme: {
			description:
				" Partial or complete theme to override the component's colour palette.\n" +
				'The sanctioned colours have have been set out by the design system team.\n',
			table: {
				type: {
					summary: 'Partial<ThemeIcon>',
					detail: '{\n' + '\tfill?: string;\n' + '}',
				},
			},
		},
		size: {
			control: 'select',
			options: ['xsmall', 'small', 'medium'],
			description: 'The size of the Icon',
			table: {
				type: { summary: 'xsmall | small | medium' },
			},
		},
		icons: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;

// *****************************************************************************

const Template: StoryFn<IconChromaticStoryArgs> = (
	args: IconChromaticStoryArgs,
) => {
	const icons = args.icons.map((Icon, index) => (
		<Icon
			key={index}
			size={args.size}
			theme={args.theme}
			isAnnouncedByScreenReader={args.isAnnouncedByScreenReader}
		/>
	));

	return <>{icons}</>;
};

// *****************************************************************************

export const XsmallIconsDefaultTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
XsmallIconsDefaultTheme.args = {
	size: 'xsmall',
	isAnnouncedByScreenReader: true,
	icons: Object.values(uiIcons),
};

// *****************************************************************************

export const SmallIconsDefaultTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
SmallIconsDefaultTheme.args = {
	size: 'small',
	isAnnouncedByScreenReader: true,
	icons: Object.values(uiIcons),
};

// *****************************************************************************

export const MediumIconsDefaultTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
MediumIconsDefaultTheme.args = {
	size: 'medium',
	isAnnouncedByScreenReader: true,
	icons: Object.values(uiIcons),
};

// *****************************************************************************

export const MediumIconsBrandTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
MediumIconsBrandTheme.args = {
	theme: { fill: palette.neutral[100] },
	size: 'medium',
	isAnnouncedByScreenReader: true,
	icons: Object.values(uiIcons),
};
MediumIconsBrandTheme.parameters = {
	backgrounds: {
		default: 'brandBackground.primary',
	},
};

// *****************************************************************************

export const PaymentIconsDefaultTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
PaymentIconsDefaultTheme.args = {
	size: 'medium',
	isAnnouncedByScreenReader: true,
	icons: Object.values(paymentIcons),
};

// *****************************************************************************

export const WidePaymentIconsDefaultTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
WidePaymentIconsDefaultTheme.args = {
	size: 'medium',
	isAnnouncedByScreenReader: true,
	icons: Object.values(widePaymentIcons),
};

// *****************************************************************************

export const MediumIconsCustomTheme: StoryFn<IconChromaticStoryArgs> =
	Template.bind({});
MediumIconsCustomTheme.args = {
	theme: { fill: palette.neutral[86] },
	size: 'medium',
	isAnnouncedByScreenReader: true,
	icons: Object.values(uiIcons),
};
MediumIconsCustomTheme.parameters = {
	backgrounds: {
		default: 'background.inverse',
	},
};
