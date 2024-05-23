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
}
