import type { StoryObj, Meta } from '@storybook/react';
import { useState } from 'react';
import { breakpoints, palette } from '../../foundations';
import { ChoiceCard } from './ChoiceCard';
import ChoiceCardStories from './ChoiceCard.stories';
import { ChoiceCardGroup } from './ChoiceCardGroup';
import type { ThemeChoiceCard } from './theme';

const meta: Meta<typeof ChoiceCardGroup> = {
	title: 'React Components/ChoiceCardGroup',
	component: ChoiceCardGroup,
	argTypes: {
		columns: {
			options: [undefined, 2, 3, 4, 5],
			control: { type: 'select' },
		},
		error: {
			options: [undefined, 'Please select a choice card to continue'],
			control: { type: 'select' },
		},
	},
};

export default meta;
type Story = StoryObj<
	React.ComponentProps<typeof ChoiceCardGroup> & {
		themeChild?: Partial<ThemeChoiceCard>;
	}
>;

const ChoiceCardGroupTemplate: Story = {
	render: (args) => (
		<ChoiceCardGroup {...args}>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc1"
				value="option-1"
				label="Option 1"
				key={1}
				theme={args.themeChild}
			/>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc2"
				value="option-2"
				label="Option 2"
				key={2}
				theme={args.themeChild}
			/>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc3"
				value="option-3"
				label="Option 3"
				key={3}
				theme={args.themeChild}
			/>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc4"
				value="option-4"
				label="Option 4"
				key={4}
				theme={args.themeChild}
			/>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc5"
				value="option-5"
				label="Option 5"
				key={5}
				theme={args.themeChild}
			/>
			<ChoiceCard
				{...ChoiceCardStories.args}
				id="abc6"
				value="option-6"
				label="Option 6"
				key={6}
				theme={args.themeChild}
			/>
		</ChoiceCardGroup>
	),
};

export const DefaultDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		name: 'colours',
		label: undefined,
		supporting: undefined,
		multi: false,
		hideLabel: false,
	},
};

export const DefaultMobileDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
	},
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: {
			viewports: [breakpoints.mobileMedium],
		},
	},
};

export const DefaultTabletDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
	},
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const DefaultIn2ColumnsDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		columns: 2,
	},
};

export const DefaultIn3ColumnsDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		columns: 3,
	},
};

export const DefaultIn4ColumnsDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		columns: 4,
	},
};

export const DefaultIn5ColumnsDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		columns: 5,
	},
};

export const WithLabelDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		label: 'Choose an option',
	},
};

export const WithSupportingDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...WithLabelDefaultTheme.args,
		supporting: 'These are your options',
	},
};

export const WithErrorDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...DefaultDefaultTheme.args,
		error: 'Please select a choice card to continue',
	},
};

export const WithLabelAndErrorDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...WithLabelDefaultTheme.args,
		error: 'Please select a choice card to continue',
	},
};

export const WithLabelAndSupportingAndErrorDefaultTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...WithSupportingDefaultTheme.args,
		error: 'Please select a choice card to continue',
	},
};

export const WithWildlyVaryingLengthsDefaultTheme: Story = {
	render: (args) => (
		<ChoiceCardGroup {...args}>
			<ChoiceCard
				id="abc1"
				value="option-1"
				label="A very, very, very, very, very, very, very long piece of text indeed"
				key={1}
			/>
			<ChoiceCard
				id="abc2"
				value="option-2"
				label="Something probable"
				key={2}
			/>
			<ChoiceCard id="abc3" value="option-3" label="Short" key={3} />
		</ChoiceCardGroup>
	),
	args: {
		...WithSupportingDefaultTheme.args,
	},
};

export const WithWildlyVaryingLengthsMobileDefaultTheme: Story = {
	...WithWildlyVaryingLengthsDefaultTheme,
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const WithWildlyVaryingLengthsTabletDefaultTheme: Story = {
	...WithWildlyVaryingLengthsDefaultTheme,
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};

export const ControlledMultiSelectDefaultTheme: Story = {
	render: (args) => {
		const [state, setState] = useState({
			opt1: true,
			opt2: true,
		});
		return (
			<>
				<ChoiceCardGroup {...args}>
					<ChoiceCard
						id="abc1"
						value="option-1"
						label="Option 1"
						checked={state.opt1}
						onChange={() => setState({ ...state, opt1: !state.opt1 })}
					/>
					<ChoiceCard
						id="abc2"
						value="option-2"
						label="Option 2"
						checked={state.opt2}
						onChange={() => setState({ ...state, opt2: !state.opt2 })}
					/>
				</ChoiceCardGroup>
				<pre>
					Option 1: {state.opt1 ? 'selected' : 'unselected'}
					{'\n'}
					Option 2: {state.opt2 ? 'selected' : 'unselected'}
				</pre>
			</>
		);
	},
	args: {
		...WithSupportingDefaultTheme.args,
		multi: true,
	},
};

export const UnControlledMultiSelectDefaultTheme: Story = {
	render: (args) => (
		<ChoiceCardGroup {...args}>
			<ChoiceCard id="abc1" value="option-1" label="Option 1" defaultChecked />
			<ChoiceCard id="abc2" value="option-2" label="Option 2" defaultChecked />
		</ChoiceCardGroup>
	),
	args: {
		...WithSupportingDefaultTheme.args,
		multi: true,
	},
	name: 'Un-controlled Multi Select',
};

export const UnControlledSingleSelectDefaultTheme: Story = {
	render: (args) => (
		<ChoiceCardGroup {...args}>
			<ChoiceCard id="abc1" value="option-1" label="Option 1" />
			<ChoiceCard id="abc2" value="option-2" label="Option 2" defaultChecked />
		</ChoiceCardGroup>
	),
	args: {
		...WithSupportingDefaultTheme.args,
		multi: false,
	},
	name: 'Un-controlled Single Select',
};

export const WithSupportingCustomTheme: Story = {
	...ChoiceCardGroupTemplate,
	args: {
		...WithSupportingDefaultTheme.args,
		theme: {
			textLabel: palette.neutral[86],
			textSupporting: palette.neutral[60],
		},
		themeChild: {
			textUnselected: palette.neutral[86],
			borderUnselected: palette.neutral[86],
			backgroundUnselected: palette.neutral[20],
			textSelected: palette.brand[400],
			borderSelected: palette.brand[800],
			backgroundSelected: palette.neutral[100],
			textHover: palette.brand[800],
			borderHover: palette.brand[800],
			backgroundHover: palette.neutral[20],
			backgroundTick: palette.brand[400],
		},
	},

	parameters: {
		backgrounds: {
			default: 'background.inverse',
		},
	},
};
