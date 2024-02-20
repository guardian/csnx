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
	theme?: Partial<ThemeUserFeedback>;
}
