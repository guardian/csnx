import type { Meta, StoryObj } from '@storybook/react';
import { ThemeContext } from '../context/ThemeContext';
import { defaultTheme } from '../theme';
import { SolutionDisplayKey } from './SolutionDisplayKey';

const meta: Meta<typeof SolutionDisplayKey> = {
	component: SolutionDisplayKey,
	title: 'Components/Solution Display Key',

	args: {},
	decorators: [
		(Story) => (
			<ThemeContext.Provider value={defaultTheme}>
				<Story />
			</ThemeContext.Provider>
		),
	],
};

export default meta;

type Story = StoryObj<typeof SolutionDisplayKey>;

export const Default: Story = {
	args: {},
};
