import type { HTMLAttributes, ReactNode } from 'react';
import type { InputSize } from '../../@types/InputSize';
import type { Props } from '../../@types/Props';
import type { ThemeUserFeedback } from '../theme';

export interface UserFeedbackProps
	extends Props,
		HTMLAttributes<HTMLSpanElement> {
	/**
	 * Size of feedback message and icon
	 */
	size?: InputSize;
	children: ReactNode;
	/**
	 * Partial or complete theme to override the component's colour palette.<br>
	 * The sanctioned colours have been set out by the design system team.<br>
	 * The colours which can be changed are:
	 *
	 *  `textSuccess`<br>
	 *  `textError`
	 *
	 */
	theme?: Partial<ThemeUserFeedback>;
}
