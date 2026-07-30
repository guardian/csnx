import type { Props } from '@guardian/source/react-components';
import type { HTMLAttributes } from 'react';
import { disclaimerStyles } from './styles';
import { type DisclaimerTheme } from './theme';

/**
 * Disclaimer is used to disclose limitations, risks, non-liability, or conditions of use associated with the surrounding material.
 */
export const Disclaimer = ({
	cssOverrides,
	children,
	theme,
	...props
}: DisclaimerProps) => (
	<aside
		css={[disclaimerStyles(theme), cssOverrides]}
		data-testid={disclaimerComponentId}
		data-component={disclaimerComponentId}
		{...props}
	>
		{children}
	</aside>
);
const disclaimerComponentId = 'disclaimer-component';

export interface DisclaimerProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * Partial or complete theme to override the component's colour palette.
	 *
	 *  `textPrimary` - primary colour of text<br>
	 *  `backgroundPrimary` - bg colour of box<br>
	 *  `linkPrimary` - primary colour of <a> tag text<br>
	 */
	theme?: Partial<DisclaimerTheme>;
}
