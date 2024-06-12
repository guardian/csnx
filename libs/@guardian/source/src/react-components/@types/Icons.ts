import type { ThemeIcon } from '../icons/theme';

export type IconSize = 'xsmall' | 'small' | 'medium';

export interface IconProps {
	size?: IconSize;
	/**
	 * Partial or complete theme to override the component's colour palette.
	 * The sanctioned colours have have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 * `fill`
	 */
	theme?: Partial<ThemeIcon>;
	isAnnouncedByScreenReader?: boolean;
}
