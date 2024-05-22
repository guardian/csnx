import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	focusHalo,
	remHeight,
	remSpace,
	textSansBold15,
} from '@guardian/source-foundations';
import { themeColour } from './theme';

export const containerStyles = css`
	border-image: repeating-linear-gradient(
			to bottom,
			${themeColour('--horizontalRules')},
			${themeColour('--horizontalRules')} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${themeColour('--border')};
	background: ${themeColour('--background')};
	color: ${themeColour('--text')};
	box-shadow: none;
	position: relative;
	margin-bottom: ${remSpace[9]};

	.expander__checkbox:checked ~ label {
		background: ${themeColour('--collapseBackground')};
		color: ${themeColour('--collapseText')};
		border: 1px solid ${themeColour('--collapseText')};

		&:hover {
			background-color: ${themeColour('--collapseBackgroundHover')};
			color: ${themeColour('--collapseTextHover')};

			#svgminus {
				fill: ${themeColour('--collapseTextHover')};
			}
		}

		#svgminus {
			fill: ${themeColour('--collapseText')};
		}
	}
	.expander__checkbox ~ label #svgplus {
		fill: ${themeColour('--expandText')};
	}

	.expander__checkbox:checked ~ .expander__collapsible-body {
		max-height: fit-content;
		margin-bottom: ${remSpace[6]};
	}

	.expander__checkbox:focus ~ .expander__collapsible-body {
		${focusHalo};
	}
`;

export const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${themeColour('--background')},
		${themeColour('--background')} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

export const showHideLabelStyles = css`
	${textSansBold15};
	display: inline-flex;
	justify-content: space-between;
	box-shadow: none;
	align-items: center;
	box-sizing: border-box;
	cursor: pointer;
	position: absolute;
	bottom: -${remHeight.ctaSmall / 2}rem;
	border-radius: ${remHeight.ctaSmall}rem;
	padding: 0 ${remSpace[4]};
	padding-bottom: 2px;
	border: 1px solid ${themeColour('--expandBackground')};
	text-decoration: none;
	background: ${themeColour('--expandBackground')};
	color: ${themeColour('--expandText')};
	height: ${remHeight.ctaSmall}rem;
	min-height: ${remHeight.ctaSmall}rem;
	margin-left: ${remSpace[2]};

	&:hover {
		background-color: ${themeColour('--expandBackgroundHover')};
	}
`;

export const collapsibleBodyStyles = (
	collapsedHeight: string,
): SerializedStyles => css`
	margin: 0;
	max-height: ${collapsedHeight};
	overflow: hidden;
`;

export const buttonIconStyles = css`
	svg {
		display: block;
		width: 1.5rem;
		height: auto;
		margin-left: -${remSpace[1]};
		margin-right: ${remSpace[1]};
	}
`;

export const extraStyles = css`
	display: flex;
	align-items: center;
	padding: 0 ${remSpace[1]};
	position: absolute;
	right: 0;
	margin-top: -${remSpace[6]};
`;
