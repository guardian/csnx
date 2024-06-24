import type { ButtonHTMLAttributes } from 'react';
import type { SharedLinkProps } from './@types/SharedLinkProps';
import { linkContents } from './shared';
import { linkStyles } from './styles';

export interface ButtonLinkProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		SharedLinkProps {}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-buttonlink--primary-button-link-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/43c26b-link/b/048fd1) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/link/ButtonLink.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Links are used as navigational aids. They may appear inline in a paragraph, as items in a list or as stand alone text elements.
 *
 * The following themes are supported: `light`, `brand`, `brandYellow`
 */
export const ButtonLink = ({
	priority = 'primary',
	icon: iconSvg,
	iconSide = 'left',
	cssOverrides,
	children,
	theme,
	...props
}: ButtonLinkProps) => {
	return (
		<button
			css={linkStyles({
				isButton: true,
				priority,
				iconSvg,
				iconSide,
				cssOverrides,
				theme,
			})}
			{...props}
		>
			{linkContents({ children, iconSvg, iconSide })}
		</button>
	);
};
