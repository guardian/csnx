import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { from, headline, space } from '@guardian/source-foundations';
import { tabsThemeDefault } from './theme';

export const tabList = css`
	display: flex;
	align-items: flex-end;
	justify-content: flex-start;
`;

export const tabButton = (
	tabs = tabsThemeDefault.tabs,
): SerializedStyles => css`
	background-color: ${tabs.background};
	${headline.xxxsmall({
		fontWeight: 'bold',
	})}
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	appearance: none;
	width: 100%;
	height: ${space[12]}px;
	text-align: left;
	color: ${tabs.text};
	padding: ${space[2]}px ${space[3]}px;
	border: 1px solid ${tabs.border};
	border-bottom: none;
	cursor: pointer;

	:first-of-type {
		margin-left: ${space[2]}px;
		border-radius: ${space[2]}px 0 0 0;
	}
	:last-of-type {
		border-radius: 0 ${space[2]}px 0 0;
	}

	${from.phablet} {
		${headline.xxsmall({
			fontWeight: 'bold',
		})}
		width: 210px;
	}

	&[aria-selected='false'] {
		background-color: ${tabs.inactiveBackground};
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

export const tabPanel = (tabs = tabsThemeDefault.tabs): SerializedStyles => css`
	position: relative;
	padding: ${space[3]}px;
	background: ${tabs.background};
	border-top: 1px solid ${tabs.border};
	color: ${tabs.text};
`;
