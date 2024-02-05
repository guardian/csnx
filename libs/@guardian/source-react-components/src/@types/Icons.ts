import type { ThemeIcon } from '../icons/theme';

export type IconSize = 'xsmall' | 'small' | 'medium';

export interface IconProps {
	size?: IconSize;
	theme?: ThemeIcon;
	isAnnouncedByScreenReader?: boolean;
}
