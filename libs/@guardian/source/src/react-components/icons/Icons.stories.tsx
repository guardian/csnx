import type { Meta, StoryObj } from '@storybook/react';
import { palette } from '../../foundations';
import type { IconProps, IconSize } from '../@types/Icons';
import { SvgAddToBasket } from '../__generated__/icons/SvgAddToBasket';
import { SvgAlarmClockFilled } from '../__generated__/icons/SvgAlarmClockFilled';
import { SvgAlarmClockOutlined } from '../__generated__/icons/SvgAlarmClockOutlined';
import { SvgAlarmClockSounded } from '../__generated__/icons/SvgAlarmClockSounded';
import { SvgAlertPhone } from '../__generated__/icons/SvgAlertPhone';
import { SvgAlertRound } from '../__generated__/icons/SvgAlertRound';
import { SvgAllRecipes } from '../__generated__/icons/SvgAllRecipes';
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
import { SvgBookmarkCross } from '../__generated__/icons/SvgBookmarkCross';
import { SvgBookmarkFilled } from '../__generated__/icons/SvgBookmarkFilled';
import { SvgBookmarkOutlined } from '../__generated__/icons/SvgBookmarkOutlined';
import { SvgBookmarkRoundFilled } from '../__generated__/icons/SvgBookmarkRoundFilled';
import { SvgBookmarkRoundOutlined } from '../__generated__/icons/SvgBookmarkRoundOutlined';
import { SvgBookOutlined } from '../__generated__/icons/SvgBookOutlined';
import { SvgCalendar } from '../__generated__/icons/SvgCalendar';
import { SvgCamera } from '../__generated__/icons/SvgCamera';
import { SvgCameraRoundOutlined } from '../__generated__/icons/SvgCameraRoundOutlined';
import { SvgCameraSmall } from '../__generated__/icons/SvgCameraSmall';
import { SvgCheckmark } from '../__generated__/icons/SvgCheckmark';
import { SvgChef } from '../__generated__/icons/SvgChef';
import { SvgChevronDownDouble } from '../__generated__/icons/SvgChevronDownDouble';
import { SvgChevronDownSingle } from '../__generated__/icons/SvgChevronDownSingle';
import { SvgChevronDownSingleSmall } from '../__generated__/icons/SvgChevronDownSingleSmall';
import { SvgChevronDownSingleXsmall } from '../__generated__/icons/SvgChevronDownSingleXsmall';
import { SvgChevronLeftDouble } from '../__generated__/icons/SvgChevronLeftDouble';
import { SvgChevronLeftSingle } from '../__generated__/icons/SvgChevronLeftSingle';
import { SvgChevronLeftSingleSmall } from '../__generated__/icons/SvgChevronLeftSingleSmall';
import { SvgChevronRightDouble } from '../__generated__/icons/SvgChevronRightDouble';
import { SvgChevronRightSingle } from '../__generated__/icons/SvgChevronRightSingle';
import { SvgChevronRightSingleSmall } from '../__generated__/icons/SvgChevronRightSingleSmall';
import { SvgChevronUpAndDownSmall } from '../__generated__/icons/SvgChevronUpAndDownSmall';
import { SvgChevronUpDouble } from '../__generated__/icons/SvgChevronUpDouble';
import { SvgChevronUpSingle } from '../__generated__/icons/SvgChevronUpSingle';
import { SvgChevronUpSingleSmall } from '../__generated__/icons/SvgChevronUpSingleSmall';
import { SvgClockBaselineSmall } from '../__generated__/icons/SvgClockBaselineSmall';
import { SvgClockFilled } from '../__generated__/icons/SvgClockFilled';
import { SvgClockOutlined } from '../__generated__/icons/SvgClockOutlined';
import { SvgCloudSync } from '../__generated__/icons/SvgCloudSync';
import { SvgCloudUpload } from '../__generated__/icons/SvgCloudUpload';
import { SvgCreditCard } from '../__generated__/icons/SvgCreditCard';
import { SvgCross } from '../__generated__/icons/SvgCross';
import { SvgCrossedOutCloud } from '../__generated__/icons/SvgCrossedOutCloud';
import { SvgCrossRoundFilled } from '../__generated__/icons/SvgCrossRoundFilled';
import { SvgCrossRoundOutlined } from '../__generated__/icons/SvgCrossRoundOutlined';
import { SvgCrossSmall } from '../__generated__/icons/SvgCrossSmall';
import { SvgCrosswords } from '../__generated__/icons/SvgCrosswords';
import { SvgCuisines } from '../__generated__/icons/SvgCuisines';
import { SvgDiets } from '../__generated__/icons/SvgDiets';
import { SvgDirectDebit } from '../__generated__/icons/SvgDirectDebit';
import { SvgDiscover } from '../__generated__/icons/SvgDiscover';
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
import { SvgFilterAndroidApp } from '../__generated__/icons/SvgFilterAndroidApp';
import { SvgFilterAndroidAppSmall } from '../__generated__/icons/SvgFilterAndroidAppSmall';
import { SvgFilterIosApp } from '../__generated__/icons/SvgFilterIosApp';
import { SvgFilterIosAppSmall } from '../__generated__/icons/SvgFilterIosAppSmall';
import { SvgFilterOutlinedWeb } from '../__generated__/icons/SvgFilterOutlinedWeb';
import { SvgFolder } from '../__generated__/icons/SvgFolder';
import { SvgFolderFilled } from '../__generated__/icons/SvgFolderFilled';
import { SvgGift } from '../__generated__/icons/SvgGift';
import { SvgGlobe } from '../__generated__/icons/SvgGlobe';
import { SvgGoogleBrand } from '../__generated__/icons/SvgGoogleBrand';
import { SvgGps } from '../__generated__/icons/SvgGps';
import { SvgHandPointed } from '../__generated__/icons/SvgHandPointed';
import { SvgHeadphonesFilled } from '../__generated__/icons/SvgHeadphonesFilled';
import { SvgHeadphonesOutlined } from '../__generated__/icons/SvgHeadphonesOutlined';
import { SvgHeadphonesRoundFilled } from '../__generated__/icons/SvgHeadphonesRoundFilled';
import { SvgHeadphonesRoundOutlined } from '../__generated__/icons/SvgHeadphonesRoundOutlined';
import { SvgHomeHouseFilled } from '../__generated__/icons/SvgHomeHouseFilled';
import { SvgHomeHouseOutlined } from '../__generated__/icons/SvgHomeHouseOutlined';
import { SvgHomeSquareFilled } from '../__generated__/icons/SvgHomeSquareFilled';
import { SvgHomeSquareOutlined } from '../__generated__/icons/SvgHomeSquareOutlined';
import { SvgHouseCross } from '../__generated__/icons/SvgHouseCross';
import { SvgHousePlus } from '../__generated__/icons/SvgHousePlus';
import { SvgHouseSetting } from '../__generated__/icons/SvgHouseSetting';
import { SvgIndent } from '../__generated__/icons/SvgIndent';
import { SvgInfoRound } from '../__generated__/icons/SvgInfoRound';
import { SvgIngredient1 } from '../__generated__/icons/SvgIngredient1';
import { SvgIngredient2 } from '../__generated__/icons/SvgIngredient2';
import { SvgIngredient3 } from '../__generated__/icons/SvgIngredient3';
import { SvgKnifeAndFork } from '../__generated__/icons/SvgKnifeAndFork';
import { SvgLinkedIn } from '../__generated__/icons/SvgLinkedIn';
import { SvgList } from '../__generated__/icons/SvgList';
import { SvgLocationMarker } from '../__generated__/icons/SvgLocationMarker';
import { SvgMagnifyingGlass } from '../__generated__/icons/SvgMagnifyingGlass';
import { SvgMagnifyingGlassMinus } from '../__generated__/icons/SvgMagnifyingGlassMinus';
import { SvgMagnifyingGlassPlus } from '../__generated__/icons/SvgMagnifyingGlassPlus';
import { SvgMagnifyingGlassSadFace } from '../__generated__/icons/SvgMagnifyingGlassSadFace';
import { SvgMealTypes } from '../__generated__/icons/SvgMealTypes';
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
import { SvgNewsletterFilled } from '../__generated__/icons/SvgNewsletterFilled';
import { SvgNewsletterOutlined } from '../__generated__/icons/SvgNewsletterOutlined';
import { SvgNewspaperArchive } from '../__generated__/icons/SvgNewspaperArchive';
import { SvgNoteFilled } from '../__generated__/icons/SvgNoteFilled';
import { SvgNoteOutlined } from '../__generated__/icons/SvgNoteOutlined';
import { SvgNotificationsOff } from '../__generated__/icons/SvgNotificationsOff';
import { SvgNotificationsOffRound } from '../__generated__/icons/SvgNotificationsOffRound';
import { SvgNotificationsOn } from '../__generated__/icons/SvgNotificationsOn';
import { SvgNotificationsOnRound } from '../__generated__/icons/SvgNotificationsOnRound';
import { SvgPadlock } from '../__generated__/icons/SvgPadlock';
import { SvgPadlockLocked } from '../__generated__/icons/SvgPadlockLocked';
import { SvgPadlockUnlocked } from '../__generated__/icons/SvgPadlockUnlocked';
import { SvgPartyOfThree } from '../__generated__/icons/SvgPartyOfThree';
import { SvgPartyPopperFilled } from '../__generated__/icons/SvgPartyPopperFilled';
import { SvgPartyPopperOutlined } from '../__generated__/icons/SvgPartyPopperOutlined';
import { SvgPayPalBrand } from '../__generated__/icons/SvgPayPalBrand';
import { SvgPerson } from '../__generated__/icons/SvgPerson';
import { SvgPersonCross } from '../__generated__/icons/SvgPersonCross';
import { SvgPersonPlus } from '../__generated__/icons/SvgPersonPlus';
import { SvgPersonRoundFilled } from '../__generated__/icons/SvgPersonRoundFilled';
import { SvgPersonRoundOutlined } from '../__generated__/icons/SvgPersonRoundOutlined';
import { SvgPersonTick } from '../__generated__/icons/SvgPersonTick';
import { SvgPhone } from '../__generated__/icons/SvgPhone';
import { SvgPinned } from '../__generated__/icons/SvgPinned';
import { SvgPinterest } from '../__generated__/icons/SvgPinterest';
import { SvgPlus } from '../__generated__/icons/SvgPlus';
import { SvgPlusOnRound } from '../__generated__/icons/SvgPlusOnRound';
import { SvgQuote } from '../__generated__/icons/SvgQuote';
import { SvgReload } from '../__generated__/icons/SvgReload';
import { SvgSettings } from '../__generated__/icons/SvgSettings';
import { SvgShareApp } from '../__generated__/icons/SvgShareApp';
import { SvgShareAppSmall } from '../__generated__/icons/SvgShareAppSmall';
import { SvgShareCallout } from '../__generated__/icons/SvgShareCallout';
import { SvgShareRoundFilled } from '../__generated__/icons/SvgShareRoundFilled';
import { SvgShareRoundOutline } from '../__generated__/icons/SvgShareRoundOutline';
import { SvgShareWeb } from '../__generated__/icons/SvgShareWeb';
import { SvgShoppingBasket } from '../__generated__/icons/SvgShoppingBasket';
import { SvgShoppingList } from '../__generated__/icons/SvgShoppingList';
import { SvgSignalBrand } from '../__generated__/icons/SvgSignalBrand';
import { SvgSort } from '../__generated__/icons/SvgSort';
import { SvgSpeechBubble } from '../__generated__/icons/SvgSpeechBubble';
import { SvgSpeechBubbleCross } from '../__generated__/icons/SvgSpeechBubbleCross';
import { SvgSpeechBubblePlus } from '../__generated__/icons/SvgSpeechBubblePlus';
import { SvgStar } from '../__generated__/icons/SvgStar';
import { SvgStarOutline } from '../__generated__/icons/SvgStarOutline';
import { SvgTelegramBrand } from '../__generated__/icons/SvgTelegramBrand';
import { SvgTextLarge } from '../__generated__/icons/SvgTextLarge';
import { SvgTextSize } from '../__generated__/icons/SvgTextSize';
import { SvgTextSizeRoundFilled } from '../__generated__/icons/SvgTextSizeRoundFilled';
import { SvgTextSizeRoundOutline } from '../__generated__/icons/SvgTextSizeRoundOutline';
import { SvgTextSmall } from '../__generated__/icons/SvgTextSmall';
import { SvgTickRound } from '../__generated__/icons/SvgTickRound';
import { SvgTimer } from '../__generated__/icons/SvgTimer';
import { SvgTransparentArrowLeftStraightRound } from '../__generated__/icons/SvgTransparentArrowLeftStraightRound';
import { SvgTwitter } from '../__generated__/icons/SvgTwitter';
import { SvgUpload } from '../__generated__/icons/SvgUpload';
import { SvgVideo } from '../__generated__/icons/SvgVideo';
import { SvgWhatsApp } from '../__generated__/icons/SvgWhatsApp';
import { SvgWhatsAppBrand } from '../__generated__/icons/SvgWhatsAppBrand';
import type { ThemeIcon } from './theme';

const uiIcons = [
	SvgAddToBasket,
	SvgAlarmClockFilled,
	SvgAlarmClockOutlined,
	SvgAlarmClockSounded,
	SvgAlertPhone,
	SvgAlertRound,
	SvgAllRecipes,
	SvgAppleBrand,
	SvgArrowContract,
	SvgArrowDownStraight,
	SvgArrowExpand,
	SvgArrowLeftStraight,
	SvgArrowOutdent,
	SvgArrowPopOut,
	SvgArrowRightStraight,
	SvgArrowScroll,
	SvgArrowUpAndDownSmall,
	SvgArrowUpStraight,
	SvgArrowUpStraightSmall,
	SvgAsterisk,
	SvgAudio,
	SvgAudioMute,
	SvgBin,
	SvgBookOutlined,
	SvgBookmarkCross,
	SvgBookmarkFilled,
	SvgBookmarkOutlined,
	SvgBookmarkRoundFilled,
	SvgBookmarkRoundOutlined,
	SvgCalendar,
	SvgCamera,
	SvgCameraRoundOutlined,
	SvgCameraSmall,
	SvgCheckmark,
	SvgChef,
	SvgChevronDownDouble,
	SvgChevronDownSingle,
	SvgChevronDownSingleSmall,
	SvgChevronDownSingleXsmall,
	SvgChevronLeftDouble,
	SvgChevronLeftSingle,
	SvgChevronLeftSingleSmall,
	SvgChevronRightDouble,
	SvgChevronRightSingle,
	SvgChevronRightSingleSmall,
	SvgChevronUpAndDownSmall,
	SvgChevronUpDouble,
	SvgChevronUpSingle,
	SvgChevronUpSingleSmall,
	SvgClockFilled,
	SvgClockOutlined,
	SvgClockBaselineSmall,
	SvgCloudSync,
	SvgCloudUpload,
	SvgCross,
	SvgCrossRoundFilled,
	SvgCrossRoundOutlined,
	SvgCrossSmall,
	SvgCrossedOutCloud,
	SvgCrosswords,
	SvgCuisines,
	SvgDiets,
	SvgDiscover,
	SvgDocument,
	SvgDownload,
	SvgDragHandle,
	SvgEdit,
	SvgEllipsis,
	SvgEnvelope,
	SvgExclamation,
	SvgExternal,
	SvgEye,
	SvgEyeStrike,
	SvgFacebook,
	SvgFacebookBrand,
	SvgFacebookMessenger,
	SvgFilter,
	SvgFilterAndroidApp,
	SvgFilterAndroidAppSmall,
	SvgFilterIosApp,
	SvgFilterIosAppSmall,
	SvgFilterOutlinedWeb,
	SvgFolder,
	SvgFolderFilled,
	SvgGift,
	SvgGlobe,
	SvgGoogleBrand,
	SvgGps,
	SvgHandPointed,
	SvgHeadphonesFilled,
	SvgHeadphonesOutlined,
	SvgHeadphonesRoundFilled,
	SvgHeadphonesRoundOutlined,
	SvgHomeHouseFilled,
	SvgHomeHouseOutlined,
	SvgHomeSquareFilled,
	SvgHomeSquareOutlined,
	SvgHouseCross,
	SvgHousePlus,
	SvgHouseSetting,
	SvgIndent,
	SvgInfoRound,
	SvgIngredient1,
	SvgIngredient2,
	SvgIngredient3,
	SvgKnifeAndFork,
	SvgLinkedIn,
	SvgList,
	SvgLocationMarker,
	SvgMagnifyingGlass,
	SvgMagnifyingGlassMinus,
	SvgMagnifyingGlassPlus,
	SvgMagnifyingGlassSadFace,
	SvgMealTypes,
	SvgMediaControlsBack,
	SvgMediaControlsForward,
	SvgMediaControlsPause,
	SvgMediaControlsPlay,
	SvgMediaControlsStop,
	SvgMenu,
	SvgMessage,
	SvgMessageRound,
	SvgMinus,
	SvgMoon,
	SvgNewsletterFilled,
	SvgNewsletterOutlined,
	SvgNewspaperArchive,
	SvgNoteFilled,
	SvgNoteOutlined,
	SvgNotificationsOff,
	SvgNotificationsOffRound,
	SvgNotificationsOn,
	SvgNotificationsOnRound,
	SvgPadlock,
	SvgPadlockLocked,
	SvgPadlockUnlocked,
	SvgPartyOfThree,
	SvgPartyPopperFilled,
	SvgPartyPopperOutlined,
	SvgPerson,
	SvgPersonCross,
	SvgPersonPlus,
	SvgPersonRoundFilled,
	SvgPersonRoundOutlined,
	SvgPersonTick,
	SvgPhone,
	SvgPinned,
	SvgPinterest,
	SvgPlus,
	SvgPlusOnRound,
	SvgQuote,
	SvgReload,
	SvgSettings,
	SvgShareApp,
	SvgShareAppSmall,
	SvgShareCallout,
	SvgShareRoundFilled,
	SvgShareRoundOutline,
	SvgShareWeb,
	SvgShoppingBasket,
	SvgShoppingList,
	SvgSignalBrand,
	SvgSort,
	SvgSpeechBubble,
	SvgSpeechBubbleCross,
	SvgSpeechBubblePlus,
	SvgStar,
	SvgStarOutline,
	SvgTelegramBrand,
	SvgTextLarge,
	SvgTextSize,
	SvgTextSizeRoundFilled,
	SvgTextSizeRoundOutline,
	SvgTextSmall,
	SvgTickRound,
	SvgTimer,
	SvgTransparentArrowLeftStraightRound,
	SvgTwitter,
	SvgUpload,
	SvgVideo,
	SvgWhatsApp,
	SvgWhatsAppBrand,
];

const paymentIcons = [SvgCreditCard, SvgDirectDebit, SvgPayPalBrand];

const IconLibrary = (args: {
	size: IconSize;
	theme: ThemeIcon;
	icons: Array<React.FunctionComponent<IconProps>>;
	isAnnouncedByScreenReader: boolean;
}) => (
	<>
		{args.icons.map((Icon, index) => (
			<Icon
				key={index}
				size={args.size}
				theme={args.theme}
				isAnnouncedByScreenReader={args.isAnnouncedByScreenReader}
			/>
		))}
	</>
);

const meta: Meta<typeof IconLibrary> = {
	title: 'React Components/Icons',
	component: IconLibrary,
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
type Story = StoryObj<typeof IconLibrary>;

// *****************************************************************************

export const XsmallIconsDefaultTheme: Story = {
	args: {
		size: 'xsmall',
		theme: undefined,
		isAnnouncedByScreenReader: true,
		icons: uiIcons,
	},
};

export const SmallIconsDefaultTheme: Story = {
	args: {
		...XsmallIconsDefaultTheme.args,
		size: 'small',
	},
};

export const MediumIconsDefaultTheme: Story = {
	args: {
		...XsmallIconsDefaultTheme.args,
		size: 'medium',
	},
};

export const MediumIconsBrandTheme: Story = {
	args: {
		...MediumIconsDefaultTheme.args,
		theme: { fill: palette.neutral[100] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const PaymentIconsDefaultTheme: Story = {
	args: {
		...MediumIconsDefaultTheme.args,
		icons: paymentIcons,
	},
};

export const MediumIconsCustomTheme: Story = {
	args: {
		...MediumIconsDefaultTheme.args,
		theme: { fill: palette.neutral[86] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
