import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { AnchorHTMLAttributes } from 'react';
import { buttonContents } from './shared';
import { buttonStyles } from './styles';
import type { SharedButtonProps } from './types';

export interface LinkButtonProps
	extends SharedButtonProps,
		AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_linkbutton--primary-priority-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/435225-button) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/button/LinkButton.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Buttons enable users to make choices or perform actions.
 *
 */
export const LinkButton = ({
	priority,
	size,
	iconSide,
	icon: iconSvg,
	nudgeIcon,
	hideLabel,
	cssOverrides,
	children,
	...props
}: LinkButtonProps): EmotionJSX.Element => (
	<a
		css={buttonStyles({
			size,
			priority,
			icon: iconSvg,
			hideLabel,
			iconSide,
			nudgeIcon,
			cssOverrides,
		})}
		{...props}
	>
		{buttonContents({
			hideLabel,
			iconSvg,
			children,
		})}
	</a>
);
