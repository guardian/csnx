import type {
	ChangeEventHandler,
	InputHTMLAttributes,
	ReactElement,
} from 'react';
import { useState } from 'react';
import type { Props } from '../@types/Props';
import type { Theme } from '../@types/Theme';
import { mergeThemes } from '../utils/themes';
import {
	choiceCard,
	contentWrapper,
	contentWrapperLabelOnly,
	errorChoiceCard,
	input,
	tick,
	tickAnimation,
} from './styles';
import type { ThemeChoiceCard } from './theme';
import {
	themeChoiceCard as defaultTheme,
	transformProviderTheme,
} from './theme';

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
	 * A component level theme to override the theme.
	 * The sanctioned colours have been set out by the design system team.
	 * The colours which can be changed are:
	 *
	 *  `textUnselected` <br>
	 *  `textSelected` <br>
	 *  `textHover` <br>
	 *  `textError` <br>
	 *  `borderUnselected` <br>
	 *  `borderSelected` <br>
	 *  `borderHover` <br>
	 *  `borderError` <br>
	 *  `backgroundUnselected` <br>
	 *  `backgroundHover` <br>
	 *  `backgroundSelected` <br>
	 *  `backgroundTick` <br>
	 *
	 */
	theme?: Partial<ThemeChoiceCard>;
}

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_choicecard--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/65ffe9-choice-card) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/choice-card/ChoiceCard.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
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
	theme = {},
	type = 'radio',
	...props
}: ChoiceCardProps) => {
	const isChecked = (): boolean => {
		if (checked != null) {
			return checked;
		}

		return !!defaultChecked;
	};

	/** Transforms an old shaped `ThemeProvider` theme to ChoiceCardTheme  */

	const mergedTheme = (providerTheme: Theme['choiceCard']) =>
		mergeThemes<ThemeChoiceCard, Theme['choiceCard']>(
			defaultTheme,
			theme,
			providerTheme,
			transformProviderTheme,
		);

	// prevent the animation firing if a Choice Card has been checked by default
	const [userChanged, setUserChanged] = useState(false);

	return (
		<>
			<input
				css={(providerTheme: Theme) => [
					input(mergedTheme(providerTheme.choiceCard)),
					userChanged ? tickAnimation : '',
					cssOverrides,
				]}
				id={id}
				value={value}
				aria-invalid={!!error}
				defaultChecked={defaultChecked ?? undefined}
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
				css={(providerTheme: Theme) => [
					choiceCard(mergedTheme(providerTheme.choiceCard)),
					error ? errorChoiceCard(mergedTheme(providerTheme.choiceCard)) : '',
				]}
				htmlFor={id}
			>
				<div css={[contentWrapper, !iconSvg ? contentWrapperLabelOnly : '']}>
					{iconSvg ? iconSvg : ''}
					<div>{labelContent}</div>
				</div>
				<span
					css={(providerTheme: Theme) => [
						tick(mergedTheme(providerTheme.choiceCard)),
					]}
				/>
			</label>
		</>
	);
};
