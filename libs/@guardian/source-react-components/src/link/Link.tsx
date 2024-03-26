import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { AnchorHTMLAttributes } from 'react';
import type { SharedLinkProps } from './@types/SharedLinkProps';
import { linkContents } from './shared';
import { linkStyles } from './styles';

export interface LinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement>,
		SharedLinkProps {}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_link--primary-link-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/43c26b-link/b/048fd1) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/link/Link.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Links are used as navigational aids. They may appear inline in a paragraph, as items in a list or as stand alone text elements.
 *
 * The following themes are supported: `light`, `brand`, `brandYellow`
 */
export const Link = ({
	priority = 'primary',
	icon: iconSvg,
	iconSide = 'left',
	cssOverrides,
	children,
	theme,
	typography,
	...props
}: LinkProps): EmotionJSX.Element => {
	return (
		<a
			css={linkStyles({
				priority,
				iconSvg,
				iconSide,
				cssOverrides,
				theme,
				typography,
			})}
			{...props}
		>
			{linkContents({ children, iconSvg, iconSide })}
		</a>
	);
};
