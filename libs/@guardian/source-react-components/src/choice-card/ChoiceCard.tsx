import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import type {
	ChangeEventHandler,
	InputHTMLAttributes,
	ReactElement,
} from 'react';
import { useState } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import {
	choiceCard,
	contentWrapper,
	contentWrapperLabelOnly,
	errorChoiceCard,
	input,
	tick,
	tickAnimation,
} from './styles';
import type { ChoiceCardTheme } from './theme';
import { choiceCardThemeDark, choiceCardThemeLight } from './theme';

type ChoiceCardFullTheme = {
	[P in keyof ChoiceCardTheme]-?: ChoiceCardTheme[P];
};

interface CombinedChoiceCardTheme extends ChoiceCardTheme {
	/** @deprecated use `textUnSelected` **/
	textLabel?: string;
	/** @deprecated use `textSelected` **/
	textChecked?: string;
	/** @deprecated use `borderUnSelected` **/
	border?: string;
	/** @deprecated use `borderSelected` **/
	borderChecked?: string;
	/** @deprecated use `backgroundSelected` **/
	backgroundChecked?: string;
}

export interface ChoiceCardProps
	extends InputHTMLAttributes<HTMLInputElement>,
		Props {
	id: string;
	/**
	 * Appears inside the choice card
	 */
	label: React.ReactNode;
	value: string;
	/**
	 * Sets whether choice card is checked. Required when using the [controlled approach](https://reactjs.org/docs/forms.html#controlled-components) to form state management.
	 *
	 * **Note**: if you pass the `checked` prop, you must also pass an `onChange` handler, or the field will be rendered as read-only.
	 */
	checked?: boolean;
	/**
	 * Set the checked state in when using an [uncontrolled approach](https://reactjs.org/docs/uncontrolled-components.html).
	 */
	defaultChecked?: boolean;
	/**
	 * An icon that appears inside the button, alongside text
	 */
	icon?: ReactElement;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	/**
	 * @ignore passed down by the parent
	 */
	error?: boolean;
	/**
	 * The type of input you want
	 */
	type?: 'radio' | 'checkbox';
	/**
	 * A component level theme to override the colour palette of the button
	 */
	theme?: ChoiceCardTheme | 'light' | 'dark';
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_choicecard--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/65ffe9-choice-card) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/choice-card/ChoiceCard.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 *
 * Choice cards are a tactile, single or multi-select mechanism used to group related options.
 *
 */
export const ChoiceCard = ({
	id,
	label: labelContent,
	value,
	icon: iconSvg,
	checked,
	defaultChecked,
	cssOverrides,
	error,
	onChange,
	theme,
	type = 'radio',
	...props
}: ChoiceCardProps): EmotionJSX.Element => {
	const isChecked = (): boolean => {
		if (checked != null) {
			return checked;
		}

		return !!defaultChecked;
	};

	const transformProvidedTheme = (
		providedTheme: CombinedChoiceCardTheme = choiceCardThemeLight,
	): ChoiceCardTheme => {
		return {
			...providedTheme,
			textUnSelected: providedTheme.textUnSelected ?? providedTheme.textLabel,
			textSelected: providedTheme.textSelected ?? providedTheme.textChecked,
			borderUnSelected: providedTheme.borderUnSelected ?? providedTheme.border,
			borderSelected:
				providedTheme.borderSelected ?? providedTheme.borderChecked,
			backgroundSelected:
				providedTheme.backgroundSelected ?? providedTheme.backgroundChecked,
		};
	};

	const getCombinedTheme = (
		providedTheme: CombinedChoiceCardTheme,
	): ChoiceCardFullTheme => {
		if (typeof theme !== 'string' && theme) {
			return {
				...choiceCardThemeLight,
				...providedTheme,
				...theme,
			};
		}
		if (typeof theme === 'string') {
			switch (theme) {
				case 'dark':
					return choiceCardThemeDark;
				case 'light':
					return choiceCardThemeLight;
			}
		}
		return { ...choiceCardThemeLight, ...providedTheme };
	};
	// prevent the animation firing if a Choice Card has been checked by default
	const [userChanged, setUserChanged] = useState(false);

	return (
		<>
			<input
				css={(theme: Theme) => [
					input(getCombinedTheme(transformProvidedTheme(theme.choiceCard))),
					userChanged ? tickAnimation : '',
					cssOverrides,
				]}
				id={id}
				value={value}
				aria-invalid={!!error}
				defaultChecked={defaultChecked != null ? defaultChecked : undefined}
				checked={checked != null ? isChecked() : undefined}
				onChange={(event) => {
					if (onChange) {
						onChange(event);
					}
					setUserChanged(true);
				}}
				type={type}
				{...props}
			/>
			<label
				css={(theme: Theme) => [
					choiceCard(
						getCombinedTheme(transformProvidedTheme(theme.choiceCard)),
					),
					error
						? errorChoiceCard(
								getCombinedTheme(transformProvidedTheme(theme.choiceCard)),
							)
						: '',
				]}
				htmlFor={id}
			>
				<div css={[contentWrapper, !iconSvg ? contentWrapperLabelOnly : '']}>
					{iconSvg ? iconSvg : ''}
					<div>{labelContent}</div>
				</div>
				<span
					css={(theme: Theme) => [
						tick(getCombinedTheme(transformProvidedTheme(theme.choiceCard))),
					]}
				/>
			</label>
		</>
	);
};
