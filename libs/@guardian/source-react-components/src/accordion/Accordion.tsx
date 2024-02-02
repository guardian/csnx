import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { transformAccordionProviderTheme } from './shared';
import { accordion } from './styles';
import type { ThemeAccordion } from './theme';
import { themeAccordion as defaultTheme } from './theme';

export interface AccordionProps extends Props {
	/**
	 * Determine whether to display the "show" and "hide" labels that toggle the
	 * collapsing and expanding of the menu. When set to `true`, the label will no
	 * longer appear. It may be useful to toggle this flag when there is limited space.
	 *
	 * _Note: the up or down chevron icon always appears._
	 */
	hideToggleLabel?: boolean;
	children: ReactElement[];
	theme?: Partial<ThemeAccordion>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_accordion--with-cta-labels-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/38c5aa-accordion/b/92b71e) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/accordion/Accordion.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * **Note**: the `max-height` of an `AccordionRow` is `500px`
 *
 */
export const Accordion = ({
	hideToggleLabel = false,
	children,
	cssOverrides,
	theme,
	...props
}: AccordionProps): EmotionJSX.Element => {
	const combineTheme = (providerTheme: Theme['accordion']): ThemeAccordion => {
		return {
			...defaultTheme,
			...transformAccordionProviderTheme(providerTheme),
			...theme,
		};
	};
	// AUDIT https://www.sarasoueidan.com/blog/accordion-markup/
	return (
		<div
			css={(providerTheme: Theme) => [
				accordion(combineTheme(providerTheme.accordion)),
				cssOverrides,
			]}
			{...props}
		>
			{Children.map(children, (child) => {
				return cloneElement(child, { hideToggleLabel });
			})}
		</div>
	);
};
