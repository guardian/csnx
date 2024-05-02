import type { JSX } from '@emotion/react/jsx-runtime';
import { descriptionId, generateSourceId } from '@guardian/source-foundations';
import type { FieldsetHTMLAttributes } from 'react';
import { Children, cloneElement } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { Inline } from '../inline/Inline';
import { Legend } from '../label/Legend';
import { Stack } from '../stack/Stack';
import { InlineError } from '../user-feedback/InlineError';
import { mergeThemes } from '../utils/themes';
import { fieldset } from './styles';
import type { ThemeRadioGroup } from './theme';
import { themeRadioGroup } from './theme';

type Orientation = 'vertical' | 'horizontal';

export interface RadioGroupProps
	extends FieldsetHTMLAttributes<HTMLFieldSetElement>,
		Props {
	id?: string;
	/**
	 * Appears as a legend at the top of the radio group
	 */
	label?: string;
	/**
	 * Visually hides the label
	 */
	hideLabel?: boolean;
	/**
	 * Additional text or component that appears below the label
	 */
	supporting?: string | JSX.Element;
	/**
	 * The direction in which radio buttons are stacked
	 */
	orientation?: Orientation;
	/**
	 * If passed, error styling should applies to this radio group. The string appears as an inline error message.
	 */
	error?: string;
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
	 *  `borderHover`<br>
	 *  `borderError`<br>
	 */
	theme?: Partial<ThemeRadioGroup>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_radiogroup--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/2891dd-radio-button/b/46940d) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/radio/RadioGroup.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Radio buttons allow users to make a single selection from a set of options.
 *
 * The following themes are supported: `default`, `brand`
 */
export const RadioGroup = ({
	id,
	name,
	label,
	hideLabel = false,
	supporting,
	orientation = 'vertical',
	error,
	cssOverrides,
	children,
	theme,
	...props
}: RadioGroupProps): JSX.Element => {
	const groupId = id ?? generateSourceId();
	const legend = label ? (
		<Legend
			text={label}
			supporting={supporting}
			hideLabel={hideLabel}
			theme={theme}
		/>
	) : (
		''
	);
	const message = error && (
		<InlineError id={descriptionId(groupId)} theme={theme}>
			{error}
		</InlineError>
	);

	const radioContainers = (
		<>
			{Children.map(children, (child) => {
				return cloneElement(
					child as React.ReactElement,
					Object.assign(
						error
							? {
									'aria-describedby': descriptionId(groupId),
								}
							: {},
						{
							name,
						},
					),
				);
			})}
		</>
	);

	const mergedTheme = (providerTheme: Theme) =>
		mergeThemes<ThemeRadioGroup, Theme['radio']>(
			themeRadioGroup,
			theme,
			providerTheme.radio,
		);

	return (
		<fieldset
			aria-invalid={!!error}
			id={groupId}
			css={(providerTheme: Theme) => [
				fieldset(mergedTheme(providerTheme)),
				cssOverrides,
			]}
			{...props}
		>
			{legend}
			{message}
			{orientation === 'vertical' ? (
				<Stack>{radioContainers}</Stack>
			) : (
				<Inline space={5}>{radioContainers}</Inline>
			)}
		</fieldset>
	);
};
