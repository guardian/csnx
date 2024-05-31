import type { Meta, StoryFn } from '@storybook/react';
import { palette } from '../../foundations';
import type { IconProps, IconSize } from '../@types/Icons';
import { SvgAlertPhone } from '../__generated__/icons/SvgAlertPhone';
import { SvgAlertRound } from '../__generated__/icons/SvgAlertRound';
import { SvgAlertTriangle } from '../__generated__/icons/SvgAlertTriangle';
import { SvgAppleBrand } from '../__generated__/icons/SvgAppleBrand';
import { SvgArrowContract } from '../__generated__/icons/SvgArrowContract';
import { SvgArrowDownStraight } from '../__generated__/icons/SvgArrowDownStraight';
import { SvgArrowExpand } from '../__generated__/icons/SvgArrowExpand';
import { SvgArrowLeftStraight } from '../__generated__/icons/SvgArrowLeftStraight';
import { SvgArrowOutdent } from '../__generated__/icons/SvgArrowOutdent';
import { SvgArrowPopOut } from '../__generated__/icons/SvgArrowPopOut';
import { SvgArrowRightStraight } from '../__generated__/icons/SvgArrowRightStraight';
import { SvgArrowScroll } from '../__generated__/icons/SvgArrowScroll';
import { SvgArrowUpAndDownSmall } from '../__generated__/icons/SvgArrowUpAndDownSmall';
import { SvgArrowUpStraight } from '../__generated__/icons/SvgArrowUpStraight';
import { SvgArrowUpStraightSmall } from '../__generated__/icons/SvgArrowUpStraightSmall';
import { SvgAsterisk } from '../__generated__/icons/SvgAsterisk';
import { SvgAudio } from '../__generated__/icons/SvgAudio';
import { SvgAudioMute } from '../__generated__/icons/SvgAudioMute';
import { SvgBin } from '../__generated__/icons/SvgBin';
import { SvgBookMark } from '../__generated__/icons/SvgBookMark';
import { SvgBookMarkCross } from '../__generated__/icons/SvgBookMarkCross';
import { SvgCalendar } from '../__generated__/icons/SvgCalendar';
import { SvgCamera } from '../__generated__/icons/SvgCamera';
import { SvgCheckmark } from '../__generated__/icons/SvgCheckmark';
import { SvgChevronDownDouble } from '../__generated__/icons/SvgChevronDownDouble';
import { SvgChevronDownSingle } from '../__generated__/icons/SvgChevronDownSingle';
import { SvgChevronDownSingleXsmall } from '../__generated__/icons/SvgChevronDownSingleXsmall';
import { SvgChevronLeftDouble } from '../__generated__/icons/SvgChevronLeftDouble';
import { SvgChevronLeftSingle } from '../__generated__/icons/SvgChevronLeftSingle';
import { SvgChevronRightDouble } from '../__generated__/icons/SvgChevronRightDouble';
import { SvgChevronRightSingle } from '../__generated__/icons/SvgChevronRightSingle';
import { SvgChevronUpDouble } from '../__generated__/icons/SvgChevronUpDouble';
import { SvgChevronUpSingle } from '../__generated__/icons/SvgChevronUpSingle';
import { SvgClock } from '../__generated__/icons/SvgClock';
import { SvgClockBaselineSmall } from '../__generated__/icons/SvgClockBaselineSmall';
import { SvgCreditCard } from '../__generated__/icons/SvgCreditCard';
import { SvgCross } from '../__generated__/icons/SvgCross';
import { SvgCrossedOutCloud } from '../__generated__/icons/SvgCrossedOutCloud';
import { SvgCrossRound } from '../__generated__/icons/SvgCrossRound';
import { SvgCrosswords } from '../__generated__/icons/SvgCrosswords';
import { SvgDirectDebit } from '../__generated__/icons/SvgDirectDebit';
import { SvgDirectDebitWide } from '../__generated__/icons/SvgDirectDebitWide';
import { SvgDocument } from '../__generated__/icons/SvgDocument';
import { SvgDownload } from '../__generated__/icons/SvgDownload';
import { SvgDragHandle } from '../__generated__/icons/SvgDragHandle';
import { SvgEdit } from '../__generated__/icons/SvgEdit';
import { SvgEllipsis } from '../__generated__/icons/SvgEllipsis';
import { SvgEnvelope } from '../__generated__/icons/SvgEnvelope';
import { SvgExclamation } from '../__generated__/icons/SvgExclamation';
import { SvgExternal } from '../__generated__/icons/SvgExternal';
import { SvgEye } from '../__generated__/icons/SvgEye';
import { SvgEyeStrike } from '../__generated__/icons/SvgEyeStrike';
import { SvgFacebook } from '../__generated__/icons/SvgFacebook';
import { SvgFacebookBrand } from '../__generated__/icons/SvgFacebookBrand';
import { SvgFacebookMessenger } from '../__generated__/icons/SvgFacebookMessenger';
import { SvgFilter } from '../__generated__/icons/SvgFilter';
import { SvgGift } from '../__generated__/icons/SvgGift';
import { SvgGlobe } from '../__generated__/icons/SvgGlobe';
import { SvgGoogleBrand } from '../__generated__/icons/SvgGoogleBrand';
import { SvgGps } from '../__generated__/icons/SvgGps';
import { SvgHandPointed } from '../__generated__/icons/SvgHandPointed';
import { SvgHouse } from '../__generated__/icons/SvgHouse';
import { SvgHouseCross } from '../__generated__/icons/SvgHouseCross';
import { SvgHousePlus } from '../__generated__/icons/SvgHousePlus';
import { SvgHouseSetting } from '../__generated__/icons/SvgHouseSetting';
import { SvgIndent } from '../__generated__/icons/SvgIndent';
import { SvgInfoRound } from '../__generated__/icons/SvgInfoRound';
import { SvgLinkedIn } from '../__generated__/icons/SvgLinkedIn';
import { SvgLocationMarker } from '../__generated__/icons/SvgLocationMarker';
import { SvgMagnifyingGlass } from '../__generated__/icons/SvgMagnifyingGlass';
import { SvgMagnifyingGlassMinus } from '../__generated__/icons/SvgMagnifyingGlassMinus';
import { SvgMagnifyingGlassPlus } from '../__generated__/icons/SvgMagnifyingGlassPlus';
import { SvgMagnifyingGlassSadFace } from '../__generated__/icons/SvgMagnifyingGlassSadFace';
import { SvgMediaControlsBack } from '../__generated__/icons/SvgMediaControlsBack';
import { SvgMediaControlsForward } from '../__generated__/icons/SvgMediaControlsForward';
import { SvgMediaControlsPause } from '../__generated__/icons/SvgMediaControlsPause';
import { SvgMediaControlsPlay } from '../__generated__/icons/SvgMediaControlsPlay';
import { SvgMediaControlsStop } from '../__generated__/icons/SvgMediaControlsStop';
import { SvgMenu } from '../__generated__/icons/SvgMenu';
import { SvgMessage } from '../__generated__/icons/SvgMessage';
import { SvgMessageRound } from '../__generated__/icons/SvgMessageRound';
import { SvgMinus } from '../__generated__/icons/SvgMinus';
import { SvgMoon } from '../__generated__/icons/SvgMoon';
import { SvgNewsletter } from '../__generated__/icons/SvgNewsletter';
import { SvgNotificationsOff } from '../__generated__/icons/SvgNotificationsOff';
import { SvgNotificationsOffRound } from '../__generated__/icons/SvgNotificationsOffRound';
import { SvgNotificationsOn } from '../__generated__/icons/SvgNotificationsOn';
import { SvgNotificationsOnRound } from '../__generated__/icons/SvgNotificationsOnRound';
import { SvgPadlock } from '../__generated__/icons/SvgPadlock';
import { SvgPartyOfThree } from '../__generated__/icons/SvgPartyOfThree';
import { SvgPayPalBrand } from '../__generated__/icons/SvgPayPalBrand';
import { SvgPerson } from '../__generated__/icons/SvgPerson';
import { SvgPersonCross } from '../__generated__/icons/SvgPersonCross';
import { SvgPersonPlus } from '../__generated__/icons/SvgPersonPlus';
import { SvgPersonRound } from '../__generated__/icons/SvgPersonRound';
import { SvgPersonTick } from '../__generated__/icons/SvgPersonTick';
import { SvgPhone } from '../__generated__/icons/SvgPhone';
import { SvgPinned } from '../__generated__/icons/SvgPinned';
import { SvgPinterest } from '../__generated__/icons/SvgPinterest';
import { SvgPlus } from '../__generated__/icons/SvgPlus';
import { SvgQuote } from '../__generated__/icons/SvgQuote';
import { SvgReload } from '../__generated__/icons/SvgReload';
import { SvgSettings } from '../__generated__/icons/SvgSettings';
import { SvgShare } from '../__generated__/icons/SvgShare';
import { SvgShareCallout } from '../__generated__/icons/SvgShareCallout';
import { SvgSignalBrand } from '../__generated__/icons/SvgSignalBrand';
import { SvgSpeechBubble } from '../__generated__/icons/SvgSpeechBubble';
import { SvgSpeechBubbleCross } from '../__generated__/icons/SvgSpeechBubbleCross';
import { SvgSpeechBubblePlus } from '../__generated__/icons/SvgSpeechBubblePlus';
import { SvgStar } from '../__generated__/icons/SvgStar';
import { SvgStarOutline } from '../__generated__/icons/SvgStarOutline';
import { SvgTelegramBrand } from '../__generated__/icons/SvgTelegramBrand';
import { SvgTextLarge } from '../__generated__/icons/SvgTextLarge';
import { SvgTextSize } from '../__generated__/icons/SvgTextSize';
import { SvgTextSmall } from '../__generated__/icons/SvgTextSmall';
import { SvgTickRound } from '../__generated__/icons/SvgTickRound';
import { SvgTwitter } from '../__generated__/icons/SvgTwitter';
import { SvgUpload } from '../__generated__/icons/SvgUpload';
import { SvgVideo } from '../__generated__/icons/SvgVideo';
import { SvgWhatsApp } from '../__generated__/icons/SvgWhatsApp';
import { SvgWhatsAppBrand } from '../__generated__/icons/SvgWhatsAppBrand';
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
	title: 'React Components/Icons',
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
