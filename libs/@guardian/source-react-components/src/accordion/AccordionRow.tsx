import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { visuallyHidden as _visuallyHidden } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { SvgChevronDownSingle } from '../../vendor/icons/SvgChevronDownSingle';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { AccordionRowNoJS } from './AccordionRowNoJS';
import { transformAccordionProviderTheme } from './shared';
import {
	accordionRow,
	button,
	chevronIconDown,
	chevronIconUp,
	collapsedBody,
	expandedBody,
	labelText,
	toggle,
	toggleIconWithLabel,
	toggleLabel,
} from './styles';
import type { ThemeAccordion } from './theme';
import { themeAccordion as defaultTheme } from './theme';

const visuallyHidden = css`
	${_visuallyHidden}
`;

export interface AccordionRowProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>,
		Props {
	/**
	 * A line of text to summarise the information that lies within the expanded state.
	 * Appears in the collapsed state, as well as prominently at the top of the expanded state.
	 */
	label: string;
	/**
	 * A callback function called when the component is opened or closed.
	 * Receives the click event as an argument.
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * @ignore passed down by the parent <Accordion />
	 */
	hideToggleLabel?: boolean;
	/**
	 * Overriding of partial or entire Accordion Row theme.
	 */
	theme?: Partial<ThemeAccordion>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_accordion--with-cta-labels-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/38c5aa-accordion/b/92b71e) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/accordion/AccordionRow.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */
export const AccordionRow = ({
	label,
	hideToggleLabel = false,
	children,
	cssOverrides,
	onClick = () => undefined,
	theme,
}: AccordionRowProps): EmotionJSX.Element => {
	const [expanded, setExpanded] = useState(false);
	const collapse = () => setExpanded(false);
	const expand = () => setExpanded(true);
	const [isBrowser, setIsBrowser] = useState(false);

	const combineTheme = (providerTheme: Theme['accordion']): ThemeAccordion => {
		return {
			...defaultTheme,
			...transformAccordionProviderTheme(providerTheme),
			...theme,
		};
	};
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		expanded ? collapse() : expand();
		onClick(event);
	}

	useEffect(() => {
		setIsBrowser(true);
	});

	if (isBrowser) {
		return (
			<div
				css={(providerTheme: Theme) => [
					accordionRow(combineTheme(providerTheme.accordion)),
					cssOverrides,
				]}
			>
				<button
					type="button"
					aria-expanded={expanded}
					onClick={handleClick}
					css={(providerTheme: Theme) => [
						button(combineTheme(providerTheme.accordion)),
						expanded ? chevronIconUp : chevronIconDown,
						!hideToggleLabel ? toggleIconWithLabel : '',
					]}
				>
					<strong css={labelText}>{label}</strong>
					<div css={toggle}>
						{hideToggleLabel ? (
							<span css={visuallyHidden}>
								{expanded ? 'Hide' : 'Show more'}
							</span>
						) : (
							<span
								css={(providerTheme: Theme) =>
									toggleLabel(combineTheme(providerTheme.accordion))
								}
							>
								{expanded ? (
									'Hide'
								) : (
									<>
										Show
										<span css={visuallyHidden}> more</span>
									</>
								)}
							</span>
						)}
						<SvgChevronDownSingle />
					</div>
				</button>
				<div
					css={(providerTheme: Theme) =>
						expanded
							? expandedBody(combineTheme(providerTheme.accordion))
							: collapsedBody
					}
				>
					<div hidden={!expanded}>{children}</div>
				</div>
			</div>
		);
	}

	return (
		<AccordionRowNoJS
			label={label}
			hideToggleLabel={hideToggleLabel}
			cssOverrides={cssOverrides}
		>
			{children}
		</AccordionRowNoJS>
	);
};
