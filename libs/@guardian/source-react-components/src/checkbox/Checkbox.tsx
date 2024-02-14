import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { generateSourceId } from '@guardian/source-foundations';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import {
	checkbox,
	checkboxContainer,
	checkboxContainerWithSupportingText,
	errorCheckbox,
	label,
	labelText,
	labelTextWithSupportingText,
	supportingText,
	tick,
	tickWithLabelText,
	tickWithSupportingText,
} from './styles';
import { themeCheckbox as defaultTheme, transformProviderTheme } from './theme';
import type { ThemeCheckbox } from './theme';

export interface CheckboxProps
	extends InputHTMLAttributes<HTMLInputElement>,
		Props {
	id?: string;
	/**
	 * Whether checkbox is checked. This is necessary when using the
	 * [controlled approach](https://reactjs.org/docs/forms.html#controlled-components)
	 * (recommended) to form state management.
	 *
	 * _Note: if you pass the `checked` prop, you MUST also pass an `onChange`
	 * handler, or the field will be rendered as read-only._
	 */
	checked?: boolean;
	/**
	 * When using the [uncontrolled approach](https://reactjs.org/docs/uncontrolled-components.html),
	 * use defaultChecked to indicate the whether the checkbox is checked intially.
	 */
	defaultChecked?: boolean;
	/**
	 * Appears to the right of the checkbox. If a visible label is
	 * undesirable (e.g. for layout reasons) use `aria-label` instead.
	 *
	 * If label is omitted, supporting text will not appear either.
	 */
	label?: ReactNode;
	/**
	 * Additional text or a component that appears below the label
	 */
	supporting?: ReactNode;
	/**
	 * Whether checkbox is in an indeterminate ("mixed") state
	 */
	indeterminate?: boolean;
	/**
	 * @ignore passed down by the parent
	 */
	error?: boolean;
	/**
	 * A component level theme to override the colour palette of the choice card component
	 */
	theme?: Partial<ThemeCheckbox>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_checkbox--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/466fad-checkbox/b/33fc2f) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/checkbox/Checkbox.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Checkboxes allow users to select multiple options from a list of individual
 * items or to indicate agreement of terms and  services.
 *
 * The following themes are supported: `default`, `brand`
 */
export const Checkbox = ({
	id,
	label: labelContent,
	checked,
	supporting,
	defaultChecked,
	error,
	indeterminate,
	cssOverrides,
	theme,
	...props
}: CheckboxProps): EmotionJSX.Element => {
	const checkboxId = id ?? generateSourceId();
	const isChecked = (): boolean => {
		if (checked != null) {
			return checked;
		}

		return !!defaultChecked;
	};
	const setIndeterminate = (el: HTMLInputElement | null): void => {
		if (el) {
			el.indeterminate = !!indeterminate;
		}
	};
	const mergedTheme = (providerTheme: Theme['checkbox']) =>
		mergeThemes<ThemeCheckbox, Theme['checkbox']>(
			defaultTheme,
			theme,
			providerTheme,
			transformProviderTheme,
		);

	const SupportingText = ({
		children,
	}: {
		children: ReactNode;
	}): EmotionJSX.Element => {
		return (
			<div
				css={(providerTheme: Theme) =>
					supportingText(mergedTheme(providerTheme.checkbox))
				}
			>
				{children}
			</div>
		);
	};

	const LabelText = ({
		hasSupportingText,
		children,
	}: {
		hasSupportingText?: boolean;
		children: ReactNode;
	}): EmotionJSX.Element => {
		return (
			<div
				css={(providerTheme: Theme) => [
					labelText(mergedTheme(providerTheme.checkbox)),
					hasSupportingText ? labelTextWithSupportingText : '',
				]}
			>
				{children}
			</div>
		);
	};

	return (
		<div
			css={(providerTheme: Theme) => [
				checkboxContainer(mergedTheme(providerTheme.checkbox), error),
				supporting ? checkboxContainerWithSupportingText : '',
			]}
		>
			<input
				id={checkboxId}
				type="checkbox"
				css={(providerTheme: Theme) => [
					checkbox(mergedTheme(providerTheme.checkbox), error),
					error ? errorCheckbox(mergedTheme(providerTheme.checkbox)) : '',
					cssOverrides,
				]}
				aria-invalid={!!error}
				ref={setIndeterminate}
				defaultChecked={defaultChecked ?? undefined}
				checked={checked != null ? isChecked() : undefined}
				{...props}
			/>
			<span
				css={(providerTheme: Theme) => [
					tick(mergedTheme(providerTheme.checkbox)),
					labelContent ?? supporting ? tickWithLabelText : '',
					supporting ? tickWithSupportingText : '',
				]}
			/>

			<label htmlFor={checkboxId} css={label}>
				{supporting ? (
					<div>
						<LabelText hasSupportingText={true}>{labelContent}</LabelText>
						<SupportingText>{supporting}</SupportingText>
					</div>
				) : (
					<LabelText>{labelContent}</LabelText>
				)}
			</label>
		</div>
	);
};
