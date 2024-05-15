import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import {
	label,
	labelText,
	labelTextWithSupportingText,
	labelWithSupportingText,
	radio,
	radioContainer,
	supportingText,
} from './styles';
import type { ThemeRadio } from './theme';
import { themeRadio, transformProviderTheme } from './theme';

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
	 * Partial or complete theme to override the component's colour palette.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `borderSelected`<br>
	 *  `borderUnselected`<br>
	 *  `borderHover`<br>
	 *  `borderError`<br>
	 *  `fillSelected`<br>
	 *  `fillUnselected`<br>
	 *  `textLabel`<br>
	 *  `textSupporting`<br>
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
}: RadioProps) => {
	const radioId = id ?? useId();
	const isChecked = (): boolean => {
		if (checked != null) {
			return checked;
		}

		return !!defaultChecked;
	};

	const mergedTheme = (providerTheme: Theme) =>
		mergeThemes<ThemeRadio, Theme['radio']>(
			themeRadio,
			theme,
			providerTheme.radio,
			transformProviderTheme,
		);

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
					labelText(mergedTheme(providerTheme)),
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
					supportingText(mergedTheme(providerTheme))
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
				radio(mergedTheme(providerTheme)),
				cssOverrides,
			]}
			value={value}
			defaultChecked={defaultChecked ?? undefined}
			checked={checked != null ? isChecked() : undefined}
			{...props}
		/>
	);

	const labelledRadioControl = (
		<div
			css={(providerTheme: Theme) => [
				radioContainer(mergedTheme(providerTheme)),
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
		<>{labelContent ?? supporting ? labelledRadioControl : radioControl}</>
	);
};
