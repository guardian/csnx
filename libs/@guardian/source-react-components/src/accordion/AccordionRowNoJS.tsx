import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { visuallyHidden as _visuallyHidden } from '@guardian/source-foundations';
import { SvgChevronDownSingle } from '../../vendor/icons/SvgChevronDownSingle';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import type { AccordionRowProps } from './AccordionRow';
import {
	accordionRow,
	chevronIconDown,
	chevronIconUp,
	collapsedBody,
	labelText,
	noJsButton,
	noJsInput,
	toggle,
	toggleIconWithLabel,
	toggleLabel,
} from './styles';
import type { ThemeAccordion } from './theme';
import {
	themeAccordion as defaultTheme,
	transformProviderTheme,
} from './theme';

const visuallyHidden = css`
	${_visuallyHidden}
`;

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_accordion--with-cta-labels-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/38c5aa-accordion/b/92b71e) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/accordion/AccordionRowNoJS.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */
export const AccordionRowNoJS = ({
	label,
	hideToggleLabel = false,
	children,
	cssOverrides,
	theme,
	...props
}: Omit<AccordionRowProps, 'onClick'>): EmotionJSX.Element => {
	const mergedTheme = (providerTheme: Theme['accordion']) =>
		mergeThemes<ThemeAccordion, Theme['accordion']>(
			defaultTheme,
			theme,
			providerTheme,
			transformProviderTheme,
		);
	return (
		<div
			css={(providerTheme: Theme) => [
				accordionRow(mergedTheme(providerTheme.accordion)),
				cssOverrides,
			]}
			{...props}
		>
			<label>
				<input
					type="checkbox"
					css={(providerTheme: Theme) =>
						noJsInput(mergedTheme(providerTheme.accordion))
					}
					role="button"
				/>
				<div
					css={(providerTheme: Theme) =>
						noJsButton(mergedTheme(providerTheme.accordion))
					}
					data-target="label"
				>
					<strong css={labelText}>{label}</strong>
					<div data-target="toggle">
						<div
							css={[
								toggle,
								chevronIconDown,
								!hideToggleLabel ? toggleIconWithLabel : '',
							]}
							data-target="toggle-label-show"
						>
							<span
								css={(providerTheme: Theme) => [
									toggleLabel(mergedTheme(providerTheme.accordion)),
									hideToggleLabel ? visuallyHidden : '',
								]}
							>
								Show<span css={visuallyHidden}> more</span>
							</span>
							<SvgChevronDownSingle theme={{ fill: theme?.iconFill }} />
						</div>
						<div
							css={[
								toggle,
								chevronIconUp,
								!hideToggleLabel ? toggleIconWithLabel : '',
							]}
							data-target="toggle-label-hide"
						>
							<span
								css={(providerTheme: Theme) => [
									toggleLabel(mergedTheme(providerTheme.accordion)),
									hideToggleLabel ? visuallyHidden : '',
								]}
							>
								Hide
							</span>
							<SvgChevronDownSingle theme={{ fill: theme?.iconFill }} />
						</div>
					</div>
				</div>
				<div css={collapsedBody} data-target="body">
					<div>{children}</div>
				</div>
			</label>
		</div>
	);
};
