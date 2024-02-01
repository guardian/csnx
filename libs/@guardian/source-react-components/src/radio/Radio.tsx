import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { generateSourceId } from '@guardian/source-foundations';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import {
	label,
	labelText,
	labelTextWithSupportingText,
	labelWithSupportingText,
	radio,
	radioContainer,
	supportingText,
} from './styles';
import { ThemeRadio, themeRadio } from './theme';

export interface RadioProps
	extends InputHTMLAttributes<HTMLInputElement>,
		Props {
	id?: string;
	/**
	 * Whether radio button is checked. This is necessary when using the
	 * [controlled approach](https://reactjs.org/docs/forms.html#controlled-components)
	 * (recommended) to form state management.
	 *
	 * _Note: if you pass the `checked` prop, you MUST also pass an `onChange`
	 * handler, or the field will be rendered as read-only._
	 */
	checked?: boolean;
	/**
	 * When using the [uncontrolled approach](https://reactjs.org/docs/uncontrolled-components.html),
	 * use defaultChecked to indicate the initially checked button.
	 */
	defaultChecked?: boolean;
	/**
	 * Appears to the right of the radio button. If a visible label is
	 * undesirable (e.g. for layout reasons) use `aria-label` instead.
	 *
	 * If label is omitted, supporting text will not appear either.
	 */
	label?: string | ReactNode;
	/**
	 * Additional text or a component that appears below the label
	 */
	supporting?: string | ReactNode;
	/**
	 * Partial or complete theme to override radio button's colour palette
	 */
	theme?: Partial<ThemeRadio>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_radio--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/2891dd-radio-button/b/46940d) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/radio/Radio.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Radio buttons allow users to make a single selection from a set of options.
 *
 * The following themes are supported: `default`, `brand`
 */
export const Radio = ({
	id,
	label: labelContent,
	value,
	supporting,
	checked,
	defaultChecked,
	cssOverrides,
	theme,
	...props
}: RadioProps): EmotionJSX.Element => {
	const radioId = id ?? generateSourceId();
	const isChecked = (): boolean => {
		if (checked != null) {
			return checked;
		}

		return !!defaultChecked;
	};

	const transformOldProviderTheme = (
		providerTheme: Theme['radio'],
	): Partial<ThemeRadio> => {
		const transformedTheme: Partial<ThemeRadio> = {};

		if (providerTheme?.backgroundChecked) {
			transformedTheme.fillSelected = providerTheme.backgroundChecked;
		}
		if (providerTheme?.border) {
			transformedTheme.borderUnselected = providerTheme.border;
		}
		if (providerTheme?.textLabelSupporting) {
			transformedTheme.textLabel = providerTheme.textLabelSupporting;
		}
		return { ...transformedTheme, ...providerTheme };
	};

	const combineThemes = (providerTheme: Theme['radio']): ThemeRadio => {
		return {
			...themeRadio,
			...transformOldProviderTheme(providerTheme),
			...theme,
		};
	};

	const LabelText = ({
		hasSupportingText,
		children,
	}: {
		hasSupportingText?: boolean;
		children: ReactNode;
	}) => {
		return (
			<div
				css={(providerTheme: Theme) => [
					hasSupportingText ? labelTextWithSupportingText : '',
					labelText(combineThemes(providerTheme.radio)),
				]}
			>
				{children}
			</div>
		);
	};

	const SupportingText = ({ children }: { children: ReactNode }) => {
		return (
			<div
				css={(providerTheme: Theme) =>
					supportingText(combineThemes(providerTheme.radio))
				}
			>
				{children}
			</div>
		);
	};

	const radioControl = (
		<input
			id={radioId}
			type="radio"
			css={(providerTheme: Theme) => [
				radio(combineThemes(providerTheme.radio)),
				cssOverrides,
			]}
			value={value}
			defaultChecked={defaultChecked != null ? defaultChecked : undefined}
			checked={checked != null ? isChecked() : undefined}
			{...props}
		/>
	);

	const labelledRadioControl = (
		<div
			css={(providerTheme: Theme) => [
				radioContainer(combineThemes(providerTheme.radio)),
				supporting ? labelWithSupportingText : '',
			]}
		>
			{radioControl}
			<label htmlFor={radioId} css={label}>
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

	return (
		<>{labelContent || supporting ? labelledRadioControl : radioControl}</>
	);
};
