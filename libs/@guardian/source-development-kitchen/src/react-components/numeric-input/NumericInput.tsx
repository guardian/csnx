import type { SerializedStyles, Theme } from '@emotion/react';
import { descriptionId, generateSourceId } from '@guardian/source/foundations';
import type {
	TextInputProps,
	textInputThemeDefault,
} from '@guardian/source/react-components';
import {
	InlineError,
	InlineSuccess,
	Label,
} from '@guardian/source/react-components';
import { InputExtension } from './InputExtension';
import {
	hasExtensions,
	inlineMessageMargin,
	inputWrapper,
	labelMargin,
	supportingTextMargin,
	textInput,
	width10,
	width30,
	width4,
	widthFluid,
} from './numericInputStyles';
import { errorInput, successInput } from './sharedStyles';

export interface InputTheme extends Theme {
	textInput?: typeof textInputThemeDefault.textInput;
}

export type Width = 30 | 10 | 4;

const widths: Record<Width, SerializedStyles> = {
	30: width30,
	10: width10,
	4: width4,
};

export type NumericInputProps = Omit<TextInputProps, 'inputmode'> & {
	/**
	 * Appears after the input. May be used with or without a prefix. Should be kept short to avoid issues on small screens.
	 * Will not be read by screen readers, so do not rely on this alone to convey meaning.
	 */
	suffixText?: string;
	/**
	 * Appears before the input. May be used with or without a suffix. Should be kept short to avoid issues on small screens.
	 * Will not be read by screen readers, so do not rely on this alone to convey meaning.
	 */
	prefixText?: string;
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-numericinput--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/097455-text-input-field/b/050445) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/numeric-input/NumericInput.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/@guardian/source-development-kitchen)
 *
 * This is an iteration on the core TextInput component for taking numeric input, such as currency amounts.
 * It can optionally display a prefix and/or suffix to add additonal visual context.
 *
 * **Note**: This component enforces inputmode="numeric" so a number keypad will appear on mobile devices
 */
export const NumericInput = ({
	id,
	label: labelText,
	optional = false,
	hideLabel = false,
	supporting,
	size = 'medium',
	width,
	error,
	success,
	prefixText,
	suffixText,
	cssOverrides,
	...props
}: NumericInputProps) => {
	const textInputId = id ?? generateSourceId();
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
			<div
				css={[
					inputWrapper,
					width ? widths[width] : widthFluid,
					supporting ? supportingTextMargin : labelMargin,
				]}
			>
				{prefixText && (
					<InputExtension
						type="prefix"
						size={size}
						error={error}
						success={success}
					>
						{prefixText}
					</InputExtension>
				)}
				<input
					css={(theme: InputTheme) => [
						textInput(theme.textInput, size),
						error ? errorInput(theme.textInput) : '',
						!error && success ? successInput(theme.textInput) : '',
						hasExtensions(prefixText, suffixText),
						cssOverrides,
					]}
					type="text"
					inputMode="numeric"
					id={textInputId}
					aria-required={!optional}
					aria-invalid={!!error}
					aria-describedby={error || success ? descriptionId(textInputId) : ''}
					required={!optional}
					{...props}
				/>
				{suffixText && (
					<InputExtension
						type="suffix"
						size={size}
						error={error}
						success={success}
					>
						{suffixText}
					</InputExtension>
				)}
			</div>
		</>
	);
};
