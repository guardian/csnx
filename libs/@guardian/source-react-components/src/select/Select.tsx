import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { descriptionId, generateSourceId } from '@guardian/source-foundations';
import type { SelectHTMLAttributes } from 'react';
import { SvgChevronDownSingle } from '../../vendor/icons/SvgChevronDownSingle';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { Label } from '../label/Label';
import { InlineError } from '../user-feedback/InlineError';
import { InlineSuccess } from '../user-feedback/InlineSuccess';
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
	children: JSX.Element | JSX.Element[];
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
	...props
}: SelectProps): EmotionJSX.Element => {
	const selectId = id ?? generateSourceId();
	return (
		<>
			<Label
				text={labelText}
				optional={!!optional}
				supporting={supporting}
				hideLabel={hideLabel}
				htmlFor={selectId}
			>
				{error && (
					<div css={inlineMessageMargin}>
						<InlineError id={descriptionId(selectId)}>{error}</InlineError>
					</div>
				)}
				{!error && success && (
					<div css={inlineMessageMargin}>
						<InlineSuccess id={descriptionId(selectId)}>
							{success}
						</InlineSuccess>
					</div>
				)}
			</Label>
			<div
				css={(theme: Theme) => [
					selectWrapper(theme.select),
					error ? errorChevron(theme.select) : '',
					!error && success ? successChevron(theme.select) : '',
					!error && !success ? supportingTextMargin : '',
				]}
			>
				<select
					css={(theme: Theme) => [
						select(theme.select),
						error ? errorInput(theme.select) : '',
						!error && success ? successInput(theme.select) : '',
						cssOverrides,
					]}
					aria-required={!optional}
					aria-invalid={!!error}
					aria-describedby={error || success ? descriptionId(selectId) : ''}
					id={selectId}
					{...props}
				>
					{children}
				</select>
				<SvgChevronDownSingle />
			</div>
		</>
	);
};
