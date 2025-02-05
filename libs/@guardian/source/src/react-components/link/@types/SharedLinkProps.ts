import type { ReactElement, ReactNode } from 'react';
import type { Props } from '../../@types/Props';
import type { ThemeLink } from '../theme';

export type LinkPriority = 'primary' | 'secondary';

export type IconSide = 'left' | 'right';

export interface SharedLinkProps extends Props {
	/**
	 * Informs users of how important a link is
	 */
	priority?: LinkPriority;
	/**
	 * Whether link is subdued (no underline)
	 *
	 * @deprecated Subdued styling has been removed and no longer gets applied
	 */
	subdued?: boolean;
	/**
	 * An icon that appears in the link, alongside text
	 */
	icon?: ReactElement;
	/**
	 * The side of the link on which the icon appears
	 */
	iconSide?: IconSide;
	children?: ReactNode;
	/**
	 * Partial or complete theme to override the component's colour palette.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `textPrimary`<br>
	 *  `textPrimaryHover`<br>
	 *  `textSecondary`<br>
	 *  `textSecondaryHover`<br>
	 *
	 */
	theme?: Partial<ThemeLink>;
	/**
	 * **Component Clicks – Ophan**
	 *
	 * The Ophan client automatically tracks click interactions
	 * on components that have the `data-link-name` attribute.
	 * To avoid race conditions, it is best to add this attribute only
	 * to server-rendered HTML.
	 *
	 * Some elements are not trackable, e.g. `div`, `span`.
	 * Refer to the Ophan documentation for more information.
	 * https://github.com/guardian/ophan/blob/0f365862682cd97cc50cf381299e0f4875e2996c/tracker-js/src/click-path-capture.js
	 *
	 * Add `data-component="component-name"` to the element you want
	 * to track. Then `add data-link-name="link-name"` to the anchor for which
	 * clicks will be tracked.
	 *
	 * The page views table will then contain `link-name` when the
	 * link is clicked.
	 */
	'data-link-name'?: string;
}
