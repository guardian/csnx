import type { JSX } from '@emotion/react/jsx-runtime';
import { descriptionId } from '@guardian/source-foundations';
import type { FieldsetHTMLAttributes } from 'react';
import { Children, cloneElement, useId } from 'react';
import type { Props } from '../@types/Props';
import { Legend } from '../label/Legend';
import { InlineError } from '../user-feedback/InlineError';
import {
	containerTopMargin,
	fieldset,
	flexContainer,
	gridColumns,
	gridContainer,
} from './styles';
import type { ThemeChoiceCardGroup } from './theme';

export type ChoiceCardColumns = 2 | 3 | 4 | 5;

export interface ChoiceCardGroupProps
	extends FieldsetHTMLAttributes<HTMLFieldSetElement>,
		Props {
	id?: string;
	/**
	 * Passed as the name attribute for each `<ChoiceCard />`
	 */
	name: string;
	/**
	 * Label describing the `ChoiceCardGroup`
	 */
	label?: string;
	/**
	 * Hide the label text visually
	 */
	hideLabel?: boolean;
	/**
	 * Additional text that appears below the `label` (does nothing without one).
	 */
	supporting?: string;
	/**
	 * If true, users may select more than one choice card (checkbox behaviour).
	 * By default, users may only select a single choice card (radio button behaviour).
	 */
	multi?: boolean;
	/**
	 * If passed, error styling should applies to this choice card group. The string appears as an inline error message.
	 */
	error?: string;
	/**
	 * To render a grid of choice cards, specify the number of columns.
	 * If this prop is not set, cards will appear on a single line.
	 */
	columns?: ChoiceCardColumns;
	children: JSX.Element | JSX.Element[];
	/**
	 * A component level theme to override the theme.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `textLabel`<br>
	 *  `textOptional`<br>
	 *  `textSupporting`<br>
	 *  `textError`<br>
	 *  `textSuccess`<br>
	 *
	 */
	theme?: Partial<ThemeChoiceCardGroup>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_choicecardgroup--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/65ffe9-choice-card) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/choice-card/ChoiceCardGroup.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components-card)
 *
 * The following themes are supported: `choiceCardDefault`.
 */
export const ChoiceCardGroup = ({
	id,
	name,
	label,
	hideLabel,
	supporting,
	multi,
	error,
	columns,
	cssOverrides,
	children,
	theme,
	...props
}: ChoiceCardGroupProps) => {
	const groupId = id ?? useId();
	const showLabel = !!(label && !hideLabel);
	const topMargin =
		(showLabel || supporting) ?? error ? containerTopMargin : '';

	return (
		<fieldset css={[fieldset, cssOverrides]} id={groupId} {...props}>
			{label ? (
				<Legend
					text={label}
					supporting={supporting}
					hideLabel={hideLabel}
					theme={theme}
				/>
			) : (
				''
			)}
			{typeof error === 'string' && (
				<InlineError id={descriptionId(groupId)} theme={theme}>
					{error}
				</InlineError>
			)}
			<div
				css={[
					columns ? [gridContainer, gridColumns[columns]] : flexContainer,
					topMargin,
				]}
			>
				{Children.map(children, (child) => {
					return cloneElement(
						child,
						Object.assign(
							{
								type: multi ? 'checkbox' : 'radio',
							},
							error
								? {
										error: true,
										'aria-describedby': descriptionId(groupId),
									}
								: {},
							{
								name,
							},
						),
					);
				})}
			</div>
		</fieldset>
	);
};
