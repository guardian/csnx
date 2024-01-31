import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { ButtonHTMLAttributes } from 'react';
import { buttonContents } from './shared';
import { buttonStyles } from './styles';
import type { SharedButtonProps } from './types';

export type ButtonTheme = {
	textPrimary: string;
	backgroundPrimary: string;
	backgroundPrimaryHover: string;
	textSecondary?: string;
	backgroundSecondary?: string;
	backgroundSecondaryHover?: string;
	textTertiary?: string;
	backgroundTertiaryHover?: string;
	borderTertiary?: string;
	textSubdued?: string;
};

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
}: ButtonProps): EmotionJSX.Element => (
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
