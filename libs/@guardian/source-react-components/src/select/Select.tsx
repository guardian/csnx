import { descriptionId, generateSourceId } from '@guardian/source-foundations';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { SvgChevronDownSingle } from '.././__generated__/icons/SvgChevronDownSingle';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { Label } from '../label/Label';
import { InlineError } from '../user-feedback/InlineError';
import { InlineSuccess } from '../user-feedback/InlineSuccess';
import { mergeThemes } from '../utils/themes';
import {
	errorChevron,
	errorInput,
	inlineMessageMargin,
	select,
	selectWrapper,
	successChevron,
	successInput,
	supportingTextMargin,
} from './styles';
import type { ThemeSelect } from './theme';
import { themeSelect as defaultTheme, transformProviderTheme } from './theme';

export interface SelectProps
	extends SelectHTMLAttributes<HTMLSelectElement>,
		Props {
	id?: string;
	/**
	 * Appears above the select box
	 */
	label: string;
	/**
	 * Adds the word "Optional" after the label
	 */
	optional?: boolean;
	/**
	 * Visually hides the label and the "Optional" text set by the `optional` flag.
	 */
	hideLabel?: boolean;
	/**
	 * Additional text that appears below the label
	 */
	supporting?: string;
	/**
	 * Whether error styling should apply to this select box. The string appears as an inline error message.
	 */
	error?: string;
	/**
	 * Whether success styling should apply to this select box. The string appears as an inline success message. This prop should not have a value set at the same time as the error prop. In the event that both are set, errors take precedence.
	 */
	success?: string;
	children: ReactNode;
	/**
	 * Partial or complete theme to override the component's colour palette.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `textUserInput`<br>
	 *  `textLabel`<br>
	 *  `textOptional`<br>
	 *  `textSupporting`<br>
	 *  `textError`<br>
	 *  `textSuccess`<br>
	 *  `backgroundInput`<br>
	 *  `border`<br>
	 *  `borderActive`<br>
	 *  `borderError`<br>
	 *  `borderSuccess`<br>
	 *  `iconFill`<br>
	 *
	 */
	theme?: Partial<ThemeSelect>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_select--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/663879-select-box/b/10875c) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/select/Select.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Select boxes allow the user to make a choice from a long list of similar options.
 *
 * The following themes are supported: `light`
 */
export const Select = ({
	id,
	label: labelText,
	optional = false,
	hideLabel = false,
	supporting,
	error,
	success,
	cssOverrides,
	children,
	theme,
	...props
}: SelectProps) => {
	const selectId = id ?? generateSourceId();
	const mergedTheme = (providerTheme: Theme['select']) =>
		mergeThemes<ThemeSelect, Theme['select']>(
			defaultTheme,
			theme,
			providerTheme,
			transformProviderTheme,
		);

	return (
		<>
			<Label
				text={labelText}
				optional={!!optional}
				supporting={supporting}
				hideLabel={hideLabel}
				htmlFor={selectId}
				theme={theme}
			>
				{error && (
					<div css={inlineMessageMargin}>
						<InlineError id={descriptionId(selectId)} theme={theme}>
							{error}
						</InlineError>
					</div>
				)}
				{!error && success && (
					<div css={inlineMessageMargin}>
						<InlineSuccess id={descriptionId(selectId)} theme={theme}>
							{success}
						</InlineSuccess>
					</div>
				)}
			</Label>
			<div
				css={(theme: Theme) => [
					selectWrapper(mergedTheme(theme.select)),
					error ? errorChevron(mergedTheme(theme.select)) : '',
					!error && success ? successChevron(mergedTheme(theme.select)) : '',
					!error && !success ? supportingTextMargin : '',
				]}
			>
				<select
					css={(theme: Theme) => [
						select(mergedTheme(theme.select)),
						error ? errorInput(mergedTheme(theme.select)) : '',
						!error && success ? successInput(mergedTheme(theme.select)) : '',
						cssOverrides,
					]}
					aria-required={!optional}
					aria-invalid={!!error}
					aria-describedby={error ?? success ? descriptionId(selectId) : ''}
					id={selectId}
					{...props}
				>
					{children}
				</select>
				<SvgChevronDownSingle theme={{ fill: theme?.iconFill }} />
			</div>
		</>
	);
};
