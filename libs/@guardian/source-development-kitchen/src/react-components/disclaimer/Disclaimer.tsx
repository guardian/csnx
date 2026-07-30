import type { Props } from '@guardian/source/react-components';
import type { HTMLAttributes } from 'react';
import { defaultDisclaimerStyles } from './styles';
import { type DisclaimerTheme } from './theme';

/**
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/disclaimer/Disclaimer.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Disclaimer is used to disclose limitations, risks, non-liability, or conditions of use associated with the surrounding material.
 *
 */
export const Disclaimer = ({
	cssOverrides,
	children,
	theme,
	...props
}: DisclaimerProps) => (
	<aside
		css={[defaultDisclaimerStyles(theme), cssOverrides]}
		data-testid={affiliateDisclaimerId}
		data-component={affiliateDisclaimerId}
		{...props}
	>
		{children}
	</aside>
);
const affiliateDisclaimerId = 'affiliate-disclaimer';

export interface DisclaimerProps extends HTMLAttributes<HTMLDivElement>, Props {
	/**
	 * Partial or complete theme to override the component's colour palette.
	 *
	 *  `textPrimary` - primary colour of text<br>
	 *  `backgroundPrimary` - bg colour of box<br>
	 *  `linkPrimary` - primary colour of <a> tag text<br>
	 */
	theme: Partial<DisclaimerTheme>;
}
