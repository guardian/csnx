import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	brand,
	neutral,
	space,
	success,
	textSans15,
	textSans17,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import type {
	LabelPosition,
	ToggleSwitchFontSize,
	ToggleSwitchFontWeight,
} from './ToggleSwitch';

export const buttonStyles = css`
	flex: none;
	border: none;
	margin: 0;
	padding: 0;
	display: inline-block;
	text-align: center;
	position: relative;
	transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		border-radius: 50%;
		background: ${neutral[100]};
		will-change: left;
		transition: left 0.15s ease-in-out;
	}

	:focus + .tooltiptext {
		opacity: 1;
		visibility: visible;
	}
`;

export const buttonStylesMargin = (
	labelPosition: LabelPosition,
): SerializedStyles => {
	switch (labelPosition) {
		case 'left':
			return css`
				margin-left: 8px;
			`;
		case 'right':
			return css`
				margin-right: 8px;
			`;
	}
};

export const toggleStyles = css`
	width: 44px;
	height: 22px;
	border-radius: 16px;
	box-sizing: unset;

	/* this will go away when resets have been standardised */
	&:before,
	&:after {
		box-sizing: border-box;
	}

	&:before {
		content: '';
		position: absolute;
		top: 5px;
		height: 11px;
		width: 6px;
		right: 8px;
		opacity: 0;
		border-bottom: 2px solid ${success[400]};
		border-right: 2px solid ${success[400]};
		transform: rotate(45deg);
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	&:after {
		height: 18px;
		width: 18px;
		top: 2px;
		left: 2px;
	}

	&[aria-checked='false'] {
		background-color: ${neutral[46]};
		border: 1px solid ${neutral[46]};
	}

	&[aria-checked='false']:before {
		transition-delay: 0;
	}

	&[aria-checked='true'] {
		background-color: ${success[400]};
		border: 1px solid ${success[400]};
	}

	&[aria-checked='true']:before {
		opacity: 1;
		z-index: 1;
		transition-delay: 0.2s;
	}

	&[aria-checked='true']:after {
		left: 24px;
		background: ${neutral[100]};
	}

	&:focus {
		outline: 0;
		html:not(.src-focus-disabled) & {
			outline: 5px solid ${brand[500]};
			outline-offset: 3px;
		}
	}
`;

export const labelStyles = (
	fontSize: ToggleSwitchFontSize,
	fontWeight: ToggleSwitchFontWeight,
): SerializedStyles => css`
	${fontSize === 'small' &&
	(fontWeight === 'regular' ? textSans15 : textSansBold15)};
	${fontSize === 'medium' &&
	(fontWeight === 'regular' ? textSans17 : textSansBold17)};
	color: ${neutral[7]};
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	user-select: none;
	position: relative;
`;

export const labelBorderStyles = css`
	border-top: 1px solid ${neutral[46]};
	padding-top: ${space[1]}px;
	width: 100%;
`;

export const tooltipStyles = css`
	position: absolute;
	visibility: hidden;
	width: 248px;
	top: 40px;
	background-color: ${neutral[100]};
	border: 1px solid rgba(18, 18, 18, 0.25);
	border-radius: 3px;
	padding: ${space[2]};
	z-index: 1;
	opacity: 0;
	transition: 0.7s opacity;
`;
