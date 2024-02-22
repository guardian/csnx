import type { SerializedStyles } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import type { Props } from '../../@types/Props';
import type { ThemeLabel } from '../theme';

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
	/**
	 * Partial or complete theme to override the component's colour palette.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `textLabel`<br>
	 *  `textOptional`<br>
	 *  `textSupporting`<br>
	 *  `textError`<br>
	 *  `textSuccess`<br>
	 */
	theme?: Partial<ThemeLabel>;
}
