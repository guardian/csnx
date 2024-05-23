import type { AnchorHTMLAttributes } from 'react';
import type { SharedButtonProps } from './@types/SharedButtonProps';
import { buttonContents } from './shared';
import { buttonStyles } from './styles';

export interface LinkButtonProps
	extends SharedButtonProps,
		AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-linkbutton--primary-priority-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/435225-button) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/button/LinkButton.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
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
	theme,
	...props
}: LinkButtonProps) => (
	<a
		css={buttonStyles({
			size,
			priority,
			icon: iconSvg,
			hideLabel,
			iconSide,
			nudgeIcon,
			cssOverrides,
			theme,
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
