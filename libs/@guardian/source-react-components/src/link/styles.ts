import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { TypographyPreset } from '@guardian/source-foundations';
import {
	focusHalo,
	space,
	textSans17,
	width,
} from '@guardian/source-foundations';
import type { ReactElement } from 'react';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import type { IconSide, LinkPriority } from './@types/SharedLinkProps';
import type { ThemeLink } from './theme';
import { themeLink as defaultTheme } from './theme';

export const link = (typographyPreset = textSans17) => {
	return css`
		position: relative;
		cursor: pointer;
		text-decoration: underline;
		text-underline-position: under;
		text-underline-offset: 5%;
		${typographyPreset};
		display: inline;
		text-decoration-thickness: 0.1em;

		align-items: center;

		&:focus {
			${focusHalo};
		}

		&:hover {
			text-decoration-thickness: calc(0.1em + 1px);
		}
	`;
};

export const buttonLink = css`
	/* override user agent styles */
	border: none;
	background: transparent;
	padding: 0;
`;

export const primary = (link: ThemeLink): SerializedStyles => css`
	color: ${link.textPrimary};

	&:hover {
		color: ${link.textPrimaryHover};
	}
`;

export const secondary = (link: ThemeLink): SerializedStyles => css`
	color: ${link.textSecondary};

	&:hover {
		color: ${link.textSecondaryHover};
	}
`;

export const icon = css`
	svg {
		fill: currentColor;
		/*
		TODO: hardcoded bottom margin to vertically align
		icons with text. This needs to be revisited when
		the rules of icon spacing have been formalised
		 */
		margin-bottom: -3px;
		width: ${width.iconXsmall}px;
		height: auto;
	}
`;

export const iconRight = css`
	svg {
		margin-left: -${space[5]}px;
	}
`;

export const iconLeft = css`
	svg {
		margin-left: -${space[6]}px;
		margin-right: ${space[1]}px;
	}
`;

const priorities: {
	[key in LinkPriority]: (link: ThemeLink) => SerializedStyles;
} = {
	primary,
	secondary,
};

const iconSides: {
	[key in IconSide]: SerializedStyles;
} = {
	right: iconRight,
	left: iconLeft,
};

export const linkStyles = ({
	isButton,
	priority,
	iconSvg,
	iconSide = 'left',
	cssOverrides,
	theme,
	typography,
}: {
	isButton?: boolean;
	priority: LinkPriority;
	isSubdued?: boolean;
	iconSvg?: ReactElement;
	iconSide?: IconSide;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	theme?: Partial<ThemeLink>;
	typography?: TypographyPreset;
}) => {
	const mergedTheme = (providerTheme: Theme['link']): ThemeLink =>
		mergeThemes<ThemeLink, Theme['link']>(defaultTheme, theme, providerTheme);
	return (
		providerTheme: Theme,
	): Array<string | SerializedStyles | SerializedStyles[] | undefined> => [
		link(typography),
		isButton ? buttonLink : '',
		priorities[priority](mergedTheme(providerTheme.link)),
		iconSvg ? icon : '',
		iconSvg ? iconSides[iconSide] : '',
		cssOverrides,
	];
};
