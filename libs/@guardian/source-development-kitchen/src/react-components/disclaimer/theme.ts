import { palette } from '@guardian/source/foundations';

export type DisclaimerTheme = {
	textPrimary: string;
	backgroundPrimary: string;
	linkPrimary: string;
};

export const defaultDisclaimerTheme: DisclaimerTheme = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.neutral[97],
	linkPrimary: palette.lifestyle[400],
} as const;
