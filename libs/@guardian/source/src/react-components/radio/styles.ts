import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	appearance,
	focusHalo,
	height,
	resets,
	space,
	textSans15,
	textSans17,
	transitions,
	width,
} from '../../foundations';
import type { ThemeRadio, ThemeRadioGroup } from './theme';

export const fieldset = (radio: ThemeRadioGroup): SerializedStyles => css`
	${resets.fieldset};

	&[aria-invalid='true'] input {
		border: 2px solid ${radio.borderError};

		&:not(:checked):hover,
		&:active {
			border: 2px solid ${radio.borderHover};
		}
	}
`;

export const radioContainer = (radio: ThemeRadio): SerializedStyles => css`
	position: relative;
	display: flex;
	align-items: flex-start;
	/**
	 * Ensure minimum height of 44px by applying 10px padding to top and bottom
	 * of container. This ensures consistent spacing when supporting text present.
	 */
	padding: ${(height.inputMedium - height.inputXsmall) / 2}px 0;
	cursor: pointer;

	&:hover {
		input {
			border: 2px solid ${radio.borderHover};
		}
	}
`;

export const label: SerializedStyles = css`
	cursor: pointer;
`;

export const radio = (radio: ThemeRadio): SerializedStyles => css`
	flex: 0 0 auto;
	cursor: pointer;
	box-sizing: border-box;
	display: inline-block;
	width: ${width.inputXsmall}px;
	height: ${height.inputXsmall}px;
	margin: 0 ${space[2]}px 0 0;

	border: 1px solid currentColor;
	border-radius: 50%;
	position: relative;
	transition: box-shadow ${transitions.short};
	transition-delay: 0.08s;

	color: ${radio.borderUnselected};

	&:checked {
		border: 2px solid ${radio.borderSelected};
		color: ${radio.fillSelected};
	}

	&:focus {
		${focusHalo};
	}

	/*
	Take care: Emotion extracts @supports blocks and moves them below
	all other <style> elements, making these values hard to override.
	I have chosen to keep these styles in the @supports block as
	moving them out makes radio buttons look horrible on older browsers
	*/
	@supports (${appearance}) {
		appearance: none;
		background-color: ${radio.fillUnselected};

		&:after {
			background: currentColor;
			position: absolute;
			content: '';
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 50%;
			transform: scale(0);
			transform-origin: center;
			transition: transform ${transitions.short};
		}

		&:checked {
			&:after {
				transform: scale(0.6);
			}
		}
	}
`;

export const labelText = (radio: ThemeRadio): SerializedStyles => css`
	${textSans17};
	color: ${radio.textLabel};
	width: 100%;
	margin-top: 1px;
	/* If label text is empty, add additional spacing to align supporting text */
	&:empty {
		margin-top: 2px;
	}
`;

export const supportingText = (radio: ThemeRadio): SerializedStyles => css`
	${textSans15};
	color: ${radio.textSupporting};
`;
