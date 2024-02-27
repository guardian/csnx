import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { ButtonHTMLAttributes } from 'react';
import type { SharedButtonProps } from './@types/SharedButtonProps';
import { buttonContents } from './shared';
import { buttonStyles } from './styles';
import './styles.css';

export interface ButtonProps
	extends SharedButtonProps,
		ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_button--primary-priority-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/435225-button) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/button/Button.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Buttons enable users to make choices or perform actions.
 *
 */
export const Button = ({
	priority = 'primary',
	size = 'default',
	icon: iconSvg,
	iconSide = 'left',
	hideLabel,
	nudgeIcon,
	type = 'button',
	isLoading = false,
	loadingAnnouncement = 'Loading',
	cssOverrides,
	children,
	theme,
	...props
}: ButtonProps): EmotionJSX.Element => {
	const hasIcon = iconSvg || isLoading;
	const hasIconAndLabel = hasIcon && !hideLabel;
	const classes = [
		'c-source-button',
		`c-source-button--${size}`,
		`c-source-button--${priority}`,
		hasIconAndLabel && `c-source-button--icon-${iconSide}`,
		hideLabel && 'c-source-button--icon-only',
		nudgeIcon && 'c-source-button--icon-nudge',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			className={classes}
			css={buttonStyles({
				size,
				icon: iconSvg,
				hideLabel,
				iconSide,
				nudgeIcon,
				cssOverrides,
				isLoading,
				theme,
			})}
			type={type}
			aria-live="polite"
			aria-label={isLoading ? loadingAnnouncement : undefined}
			{...props}
		>
			{buttonContents({
				hideLabel,
				iconSvg,
				isLoading,
				children,
			})}
		</button>
	);
};
