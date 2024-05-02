import type { JSX } from '@emotion/react/jsx-runtime';
import type { ButtonHTMLAttributes } from 'react';
import type { SharedButtonProps } from './@types/SharedButtonProps';
import { buttonContents } from './shared';
import { buttonStyles } from './styles';

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
	priority,
	size,
	icon: iconSvg,
	iconSide,
	hideLabel,
	nudgeIcon,
	type = 'button',
	isLoading = false,
	loadingAnnouncement = 'Loading',
	cssOverrides,
	children,
	theme,
	...props
}: ButtonProps): JSX.Element => (
	<button
		css={buttonStyles({
			size,
			priority,
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
