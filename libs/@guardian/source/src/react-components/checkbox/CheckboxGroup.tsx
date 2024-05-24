import type { JSX } from '@emotion/react/jsx-runtime';
import { Children, cloneElement, useId } from 'react';
import { descriptionId } from '../../foundations';
import type { Props } from '../@types/Props';
import { Legend } from '../label/Legend';
import { InlineError } from '../user-feedback/InlineError';
import { fieldset } from './styles';
import type { ThemeCheckboxGroup } from './theme';

export interface CheckboxGroupProps extends Props {
	id?: string;
	/**
	 * Gets passed as the name attribute for each checkbox
	 */
	name: string;
	/**
	 * Appears as a legend at the top of the checkbox group
	 */
	label?: string;
	/**
	 * Adds the word "Optional" after the label
	 */
	optional?: boolean;
	/**
	 * Appears as a legend at the top of the checkbox group
	 */
	hideLabel?: boolean;
	/**
	 * Visually hides the label.
	 */
	supporting?: string;
	/**
	 * If passed, error styling should apply to this group. The string appears
	 * as an inline error message
	 */
	error?: string;
	children: JSX.Element | JSX.Element[];
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
	 *
	 */
	theme?: Partial<ThemeCheckboxGroup>;
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-checkboxgroup--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/466fad-checkbox/b/33fc2f) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/checkbox/CheckboxGroup.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Checkboxes allow users to select multiple options from a list of individual
 * items or to indicate agreement of terms and  services.
 *
 * The following themes are supported: `default`, `brand`
 */
export const CheckboxGroup = ({
	id,
	name,
	label,
	hideLabel,
	optional = false,
	supporting,
	error,
	cssOverrides,
	children,
	theme,
	...props
}: CheckboxGroupProps) => {
	const groupId = id ?? useId();
	const legend = label ? (
		<Legend
			text={label}
			supporting={supporting}
			hideLabel={hideLabel}
			optional={optional}
			theme={theme}
		/>
	) : (
		''
	);

	const message =
		typeof error === 'string' ? (
			<InlineError theme={theme} id={descriptionId(groupId)}>
				{error}
			</InlineError>
		) : (
			''
		);

	return (
		<fieldset css={[fieldset, cssOverrides]} id={groupId} {...props}>
			{legend}
			{message}
			{Children.map(children, (child) => {
				return cloneElement(
					child,
					Object.assign(
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
		</fieldset>
	);
};
