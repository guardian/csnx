import { descriptionId } from '@guardian/source-foundations';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import type { InputSize } from '../@types/InputSize';
import type { Props } from '../@types/Props';
import { Label } from '../label/Label';
import { InlineError } from '../user-feedback/InlineError';
import { InlineSuccess } from '../user-feedback/InlineSuccess';
import {
	errorInput,
	inlineMessageMargin,
	labelMargin,
	successInput,
	supportingTextMargin,
	textArea,
	widthFluid,
} from './styles';
import type { ThemeTextArea } from './theme';
import { themeTextArea } from './theme';

export interface TextAreaProps
	extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'>,
		Props {
	id?: string;
	/**
	 * The contents of the text area. This is necessary when using the [controlled approach](https://reactjs.org/docs/forms.html#controlled-components) to form state management.
	 *
	 * _Note: if you pass the `value` prop, you MUST also pass an `onChange` handler, or the field will be rendered as read-only._
	 */
	value?: string;
	/**
	 * Appears above the text area
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
	 * Size of the text area, label and error message if visible.
	 */
	size?: InputSize;
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
	 * Specify the number of rows the component should display by default.
	 */
	rows?: number;
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
	 *  `borderError`<br>
	 *  `borderSuccess`<br>
	 *
	 */
	theme?: Partial<ThemeTextArea>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_textarea--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/567182-text-area/b/42916b) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/text-area/TextArea.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * The following themes are supported: `light`
 */
export const TextArea = ({
	id,
	label: labelText,
	optional = false,
	hideLabel = false,
	supporting,
	size = 'medium',
	error,
	success,
	cssOverrides,
	rows = 3,
	className,
	value,
	theme,
	...props
}: TextAreaProps) => {
	const textAreaId = id ?? useId();
	const getClassName = () => {
		const HAS_VALUE_CLASS = 'src-has-value';

		if (className) {
			return `${className}${value ? ` ${HAS_VALUE_CLASS}` : ''}`;
		}

		if (value) {
			return HAS_VALUE_CLASS;
		}

		return undefined;
	};
	const mergedTheme = { ...themeTextArea, ...theme };

	return (
		<>
			<Label
				text={labelText}
				supporting={supporting}
				optional={!!optional}
				theme={theme}
				size={size}
				hideLabel={hideLabel}
				htmlFor={textAreaId}
			>
				{error && (
					<div css={inlineMessageMargin}>
						<InlineError
							id={descriptionId(textAreaId)}
							theme={theme}
							size={size}
						>
							{error}
						</InlineError>
					</div>
				)}
				{!error && success && (
					<div css={inlineMessageMargin}>
						<InlineSuccess
							id={descriptionId(textAreaId)}
							theme={theme}
							size={size}
						>
							{success}
						</InlineSuccess>
					</div>
				)}
			</Label>
			<textarea
				css={[
					widthFluid,
					textArea(mergedTheme, size),
					supporting ? supportingTextMargin : labelMargin,
					error ? errorInput(mergedTheme) : '',
					!error && success ? successInput(mergedTheme) : '',
					cssOverrides,
				]}
				id={textAreaId}
				aria-required={!optional}
				aria-invalid={!!error}
				aria-describedby={error ?? success ? descriptionId(textAreaId) : ''}
				required={!optional}
				rows={rows}
				className={getClassName()}
				value={value}
				{...props}
			/>
		</>
	);
};
