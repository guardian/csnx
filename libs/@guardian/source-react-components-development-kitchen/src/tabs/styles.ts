import { css } from '@emotion/react';
import { from, space, textSans } from '@guardian/source-foundations';
import { tabThemeColour } from './theme';

export const tabList = css`
	display: flex;
	align-items: flex-end;
	justify-content: flex-start;
`;

export const tabButton = css`
	background-color: ${tabThemeColour('--background')};
	${textSans.medium({
		fontWeight: 'bold',
	})}
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	appearance: none;
	width: 100%;
	min-height: ${space[12]}px;
	align-self: stretch;
	text-align: left;
	color: ${tabThemeColour('--text')};
	padding: ${space[2]}px ${space[3]}px;
	border: 1px solid ${tabThemeColour('--border')};
	border-bottom: none;
	cursor: pointer;

	:first-of-type {
		margin-left: ${space[2]}px;
		border-top-left-radius: ${space[2]}px;
	}
	:nth-of-type(n + 2) {
		border-left: none;
	}
	:last-of-type {
		margin-right: ${space[2]}px;
		border-top-right-radius: ${space[2]}px;
	}

	${from.phablet} {
		${textSans.medium({
			fontWeight: 'bold',
		})}
		width: 210px;
	}

	&[aria-selected='false'] {
		background-color: ${tabThemeColour('--inactiveBackground')};
	}

	/* Pseudo-element that covers the tab panel bottom border for the active tab */
	&[aria-selected='true']::after {
		position: absolute;
		z-index: 1;
		bottom: -1px;
		right: 0;
		left: 0;
		height: 1px;
		background: inherit;
		content: '';
	}
`;

export const tabPanel = css`
	position: relative;
	padding: ${space[3]}px;
	background: ${tabThemeColour('--background')};
	border-top: 1px solid ${tabThemeColour('--border')};
	color: ${tabThemeColour('--text')};
`;
