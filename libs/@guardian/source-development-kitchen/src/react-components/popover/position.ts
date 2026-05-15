import { css, type SerializedStyles } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { PopoverProps } from './Popover';

const topPosition = css`
	bottom: calc(100% + ${space[2]}px);
	left: 50%;
	transform: translateX(-50%);
`;
const bottomPointer = (backgroundColour?: string) => css`
	bottom: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3]}px);
		bottom: -${space[3]}px;
		border-top: ${space[3]}px solid ${backgroundColour};
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const bottomPosition = css`
	top: calc(100% + ${space[2]}px);
	left: 50%;
	transform: translateX(-50%);
`;
const topPointer = (backgroundColour?: string) => css`
	top: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3]}px);
		top: -${space[3]}px;
		border-bottom: ${space[3]}px solid ${backgroundColour};
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const rightPosition = css`
	left: calc(100% + ${space[2]}px);
	top: 50%;
	transform: translateY(-50%);
`;
const leftPointer = (backgroundColour?: string) => css`
	left: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		top: calc(50% - ${space[3]}px);
		left: -${space[3]}px;
		width: 0px;
		height: 0px;
		border-right: ${space[3]}px ${backgroundColour};
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

const leftPosition = css`
	right: calc(100% + ${space[2]}px);
	top: 50%;
	transform: translateY(-50%);
`;
const rightPointer = (backgroundColour?: string) => css`
	right: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		top: calc(50% - ${space[3]}px);
		right: -${space[3]}px;
		border-left: ${space[3]}px solid ${backgroundColour};
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

/** Relatively positions the Popover element and pointer, if applicable */
export const getPositionStyles = (
	position: PopoverProps['position'],
	showPointer: PopoverProps['showPointer'],
	backgroundColour?: string,
): SerializedStyles[] => {
	switch (position) {
		case 'right':
			return showPointer
				? [rightPosition, leftPointer(backgroundColour)]
				: [rightPosition];
		case 'left':
			return showPointer
				? [leftPosition, rightPointer(backgroundColour)]
				: [leftPosition];
		case 'top':
			return showPointer
				? [topPosition, bottomPointer(backgroundColour)]
				: [topPosition];
		case 'bottom':
		default:
			return showPointer
				? [bottomPosition, topPointer(backgroundColour)]
				: [bottomPosition];
	}
};
