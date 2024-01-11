import { ThemeProvider } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import type { Story } from '@storybook/react';
import { SvgCamera } from '../../vendor/icons/SvgCamera';
import { ChoiceCard } from './ChoiceCard';
import type { ChoiceCardProps } from './ChoiceCard';
import { choiceCardThemeDefault } from './theme';

export default {
	title: 'ChoiceCard',
	component: ChoiceCard,
	args: {
		id: 'option-1-id',
		value: 'option-1',
		label: 'string',
	},
	argTypes: {
		label: {
			options: ['string', 'JSX element'],
			mapping: {
				string: 'Option 1',
				'JSX element': <em>Option 1</em>,
			},
		},
		defaultChecked: {
			control: { disable: true },
		},
		icon: {
			options: ['undefined', 'JSX element'],
			mapping: {
				undefined: undefined,
				'JSX element': <SvgCamera />,
			},
			control: { type: 'radio' },
		},
		onChange: { action: 'choice changed' },
	},
};

const choiceCardThemeDark = {
	textUnSelected: palette.neutral[86],
	textSelected: palette.brand[400],
	textHover: palette.brand[800],
	textError: palette.error[500],
	borderUnSelected: palette.neutral[86],
	borderSelected: palette.brand[800],
	borderHover: palette.brand[800],
	borderError: palette.error[500],
	backgroundUnSelected: palette.neutral[20],
	backgroundHover: palette.neutral[20],
	backgroundSelected: palette.neutral[100],
	backgroundTick: palette.brand[500],
};

const Template: Story<ChoiceCardProps> = (args: ChoiceCardProps) => (
	<div style={{ columns: 5 }}>
		<ChoiceCard {...args} />

		{/* Can use all available values */}
		<ThemeProvider
			theme={{
				choiceCard: {
					...choiceCardThemeDefault.choiceCard,
					backgroundUnSelected: palette.brandAlt[200],
					textLabel: palette.neutral[0],
				},
			}}
		>
			<ChoiceCard {...args} />
		</ThemeProvider>

		{/* Backwards compatible */}
		<ThemeProvider theme={{ choiceCard: choiceCardThemeDark }}>
			<ChoiceCard {...args} />
		</ThemeProvider>

		{/* Backwards compatible but not advised */}
		<ThemeProvider theme={{ choiceCard: choiceCardThemeDark }}>
			<ChoiceCard
				{...args}
				theme={{ backgroundUnSelected: palette.brandAlt[300] }}
			/>
		</ThemeProvider>

		{/* New advised method with props */}
		<ChoiceCard
			{...args}
			theme={{
				...choiceCardThemeDark,
				backgroundUnSelected: palette.brandAlt[300],
			}}
		/>
	</div>
);

// *****************************************************************************

export const DefaultDefaultTheme = Template.bind({});

// *****************************************************************************

export const CheckedDefaultTheme = Template.bind({});
CheckedDefaultTheme.args = {
	checked: true,
};

// *****************************************************************************

export const ErrorDefaultTheme = Template.bind({});
ErrorDefaultTheme.args = {
	error: true,
};

// *****************************************************************************

export const IconDefaultTheme = Template.bind({});
IconDefaultTheme.args = {
	label: 'Camera',
	// @ts-expect-error - Storybook maps 'JSX element' to <em>Option 1</em>
	icon: 'JSX element',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
	theme: choiceCardThemeDark,
};
