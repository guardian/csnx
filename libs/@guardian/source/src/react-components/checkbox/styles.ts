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
	textSans24,
	transitions,
	width,
} from '../../foundations';
import type { ThemeCheckbox } from './theme';

export const fieldset = css`
	${resets.fieldset};
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`;

export const checkboxContainer = (
	checkbox: ThemeCheckbox,
	error = false,
): SerializedStyles => css`
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
			border: ${error
				? `2px solid ${checkbox.borderError}`
				: `2px solid ${checkbox.borderHover}`};
			/*
				In the indeterminate state, we increase the border width by 1px on
				hover. This causes the position of the indeterminate dash to shift as it
				is absolutely positioned. This negative margin accounts for the extra
				border width and prevents the shift. We need to locate this css here as
				the hover sits on the container, rather than the input element.
			*/
			&:indeterminate {
				&:after {
					margin: -1px;
				}
			}
		}
	}
	&:active {
		input {
			border-color: ${checkbox.borderHover};
		}
	}
`;

export const label: SerializedStyles = css`
	cursor: pointer;
`;

export const checkbox = (
	checkbox: ThemeCheckbox,
	error = false,
): SerializedStyles => css`
	flex: 0 0 auto;
	box-sizing: border-box;
	display: inline-block;
	cursor: pointer;
	width: ${width.inputXsmall}px;
	height: ${height.inputXsmall}px;
	margin: 0 ${space[2]}px 0 0;

	border: 1px solid currentColor;
	background: ${checkbox.fillUnselected};
	border-radius: 4px;
	position: relative;
	transition: box-shadow ${transitions.short};
	transition-delay: 0.08s;
	color: ${checkbox.borderUnselected};

	&:focus {
		${focusHalo};
	}

	@supports (${appearance}) {
		appearance: none;
		&:checked {
			border: ${error
				? `2px solid ${checkbox.borderError}`
				: `2px solid ${checkbox.borderSelected}`};
			& ~ span:before {
				right: 0;
			}
			& ~ span:after {
				top: 0;
			}
		}

		&:indeterminate {
			&:after {
				${textSans24};
				color: ${checkbox.textIndeterminate};
				content: '-';
				position: absolute;
				top: -7px;
				left: 6px;
				z-index: 5;
			}
		}
	}
`;

export const labelText = (checkbox: ThemeCheckbox): SerializedStyles => css`
	${textSans17};
	color: ${checkbox.textLabel};
	width: 100%;
	margin-top: 1px;
	/* If label text is empty, add additional spacing to align supporting text */
	&:empty {
		margin-top: 2px;
	}
`;

export const supportingText = (
	checkbox: ThemeCheckbox,
): SerializedStyles => css`
	${textSans15};
	color: ${checkbox.textSupporting};
`;

export const tick = (checkbox: ThemeCheckbox): SerializedStyles => css`
	@supports (
		(appearance: none) or (-webkit-appearance: none) or (-moz-appearance: none)
	) {
		/* overall positional properties */
		position: absolute;
		width: 6px;
		height: 12px;
		transform: rotate(45deg);
		top: 15px;
		left: 9px;
		/**
		 * This prevents simulated click events to the checkbox (eg. from Selenium
		 * tests) being intercepted by the tick
		 */
		pointer-events: none;

		/* the checkmark ✓ */
		&:after,
		&:before {
			position: absolute;
			display: block;
			background-color: ${checkbox.fillSelected};
			transition: all ${transitions.short} ease-in-out;
			content: '';
		}

		/* the short side */
		&:before {
			height: 2px;
			bottom: 0;
			left: 0;
			right: 100%;
			transition-delay: 0.05s;
		}

		/* the long side */
		&:after {
			bottom: 0;
			right: 0;
			top: 100%;
			width: 2px;
			transition-delay: 0.1s;
		}
	}
`;

export const errorCheckbox = (checkbox: ThemeCheckbox): SerializedStyles => css`
	border: 2px solid ${checkbox.borderError};
	border-radius: 4px;
	&:not(:checked):hover,
	&:active {
		border: 2px solid ${checkbox.borderHover};
	}
`;
