import type { SerializedStyles } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { descriptionId, generateSourceId } from '@guardian/source-foundations';
import type { InputHTMLAttributes } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { Label } from '../label/Label';
import { InlineError } from '../user-feedback/InlineError';
import { InlineSuccess } from '../user-feedback/InlineSuccess';
import {
	errorInput,
	inlineMessageMargin,
	labelMargin,
	successInput,
	supportingTextMargin,
	textInput,
	width10,
	width30,
	width4,
	widthFluid,
} from './styles';
import type { InputSize } from '../@types/InputSize';
import {
	ThemeTextInput,
	themeTextInput,
	transformProviderTheme,
} from './theme';
import { mergeThemes } from '../utils/themes';

export type Width = 30 | 10 | 4;

const widths: {
	[key in Width]: SerializedStyles;
} = {
	30: width30,
	10: width10,
	4: width4,
};

export interface TextInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size'>,
		Props {
	id?: string;
	/**
	 * Appears above the text input
	 */
	label: string;
	/**
	 * Adds the word "Optional" after the label. Non-optional fields are rendered with the `required` attribute.
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
	 * Size of the text input field, label and error message if visible.
	 */
	size?: InputSize;
	/**
	 * Determines the width of a fixed-length field, based on the specified character length of the user input. If unspecified,
	 * the width will default to 100% of the field's container.
	 */
	width?: Width;
	/**
	 * Appears as an inline error message.
	 */
	error?: string;
	/**
	 * Appears as an inline success message.
	 * This prop should not have a value set at the same time as the error prop. In the event that both are set, errors take precedence.
	 */
	success?: string;
	/**
	 * The contents of the text input field. This is necessary when using the [controlled approach](https://reactjs.org/docs/forms.html#controlled-components) to form state management.
	 *
	 * _Note: if you pass the `value` prop, you MUST also pass an `onChange` handler, or the field will be rendered as read-only_
	 */
	value?: string;
	/**
	 * Partial or complete theme to override text input's colour palette
	 */
	theme?: Partial<ThemeTextInput>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_textinput--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/097455-text-input-field/b/050445) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/text-input/TextInput.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Single line fields that allow users to enter freeform data.
 *
 * The following themes are supported: `light`
 */
export const TextInput = ({
	id,
	label: labelText,
	optional = false,
	hideLabel = false,
	supporting,
	size = 'medium',
	width,
	error,
	success,
	theme,
	cssOverrides,
	...props
}: TextInputProps): EmotionJSX.Element => {
	const textInputId = id ?? generateSourceId();
	const mergedTheme = (providerTheme: Theme) =>
		mergeThemes<ThemeTextInput, Theme['textInput']>(
			themeTextInput,
			theme,
			providerTheme.textInput,
			transformProviderTheme,
		);
	return (
		<>
			<Label
				text={labelText}
				optional={!!optional}
				hideLabel={hideLabel}
				supporting={supporting}
				size={size}
				htmlFor={textInputId}
			>
				{error && (
					<div css={inlineMessageMargin}>
						<InlineError id={descriptionId(textInputId)} size={size}>
							{error}
						</InlineError>
					</div>
				)}
				{!error && success && (
					<div css={inlineMessageMargin}>
						<InlineSuccess id={descriptionId(textInputId)} size={size}>
							{success}
						</InlineSuccess>
					</div>
				)}
			</Label>
			<input
				css={(providerTheme: Theme) => [
					width ? widths[width] : widthFluid,
					textInput(mergedTheme(providerTheme), size),
					supporting ? supportingTextMargin : labelMargin,
					error ? errorInput(mergedTheme(providerTheme)) : '',
					!error && success ? successInput(mergedTheme(providerTheme)) : '',
					cssOverrides,
				]}
				type="text"
				id={textInputId}
				aria-required={!optional}
				aria-invalid={!!error}
				aria-describedby={error || success ? descriptionId(textInputId) : ''}
				required={!optional}
				{...props}
			/>
		</>
	);
};
