import type { SerializedStyles } from '@emotion/react';
import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import type { InputSize } from '../@types/InputSize';
import type { Props } from '../@types/Props';
import type { ThemeLabel } from './theme';

export interface LabelProps
	extends LabelHTMLAttributes<HTMLLabelElement>,
		Props {
	/**
	 * The label text
	 */
	text: string;
	/**
	 * Additional text or component that appears below the label
	 */
	supporting?: string;
	/**
	 * Adds the word "Optional" after the label
	 */
	optional?: boolean;
	/**
	 * Visually hides the label
	 */
	hideLabel?: boolean;
	/**
	 * Size of label
	 */
	size?: InputSize;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	children?: ReactNode;
	theme?: Partial<ThemeLabel>;
}

export interface LegendProps extends HTMLAttributes<HTMLLegendElement>, Props {
	/**
	 * The label text
	 */
	text: string;
	/**
	 * Additional text or component that appears below the label
	 */
	supporting?: string | JSX.Element;
	/**
	 * Adds the word "Optional" after the label
	 */
	optional?: boolean;
	/**
	 * Visually hides the label
	 */
	hideLabel?: boolean;
	cssOverrides?: SerializedStyles | SerializedStyles[];
	theme?: Partial<ThemeLabel>;
}
