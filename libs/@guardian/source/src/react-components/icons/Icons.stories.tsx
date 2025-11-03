import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette } from '../../foundations';
import type { IconProps, IconSize } from '../@types/Icons';
import * as icons from './icons';
import type { ThemeIcon } from './theme';

const IconLibrary = (args: {
	size: IconSize;
	theme: ThemeIcon;
	icons: Array<React.FunctionComponent<IconProps>>;
	isAnnouncedByScreenReader: boolean;
}) => (
	<>
		{args.icons.map((Icon, index) => (
			<Icon
				key={index}
				size={args.size}
				theme={args.theme}
				isAnnouncedByScreenReader={args.isAnnouncedByScreenReader}
			/>
		))}
	</>
);

const meta: Meta<typeof IconLibrary> = {
	title: 'React Components/Icons',
	component: IconLibrary,
	argTypes: {
		theme: {
			description:
				" Partial or complete theme to override the component's colour palette.\n" +
				'The sanctioned colours have have been set out by the design system team.\n',
			table: {
				type: {
					summary: 'Partial<ThemeIcon>',
					detail: '{\n' + '\tfill?: string;\n' + '}',
				},
			},
		},
		size: {
			control: 'select',
			options: ['xsmall', 'small', 'medium'],
			description: 'The size of the Icon',
			table: {
				type: { summary: 'xsmall | small | medium' },
			},
		},
		icons: {
			table: {
				disable: true,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof IconLibrary>;

// *****************************************************************************

export const XsmallIconsDefaultTheme: Story = {
	args: {
		size: 'xsmall',
		theme: undefined,
		isAnnouncedByScreenReader: true,
		icons: Object.values(icons),
	},
};

export const SmallIconsDefaultTheme: Story = {
	args: {
		...XsmallIconsDefaultTheme.args,
		size: 'small',
	},
};

export const MediumIconsDefaultTheme: Story = {
	args: {
		...XsmallIconsDefaultTheme.args,
		size: 'medium',
	},
};

export const MediumIconsBrandTheme: Story = {
	args: {
		...MediumIconsDefaultTheme.args,
		theme: { fill: palette.neutral[100] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.brand[400]',
		},
	},
};

export const MediumIconsCustomTheme: Story = {
	args: {
		...MediumIconsDefaultTheme.args,
		theme: { fill: palette.neutral[86] },
	},
	parameters: {
		backgrounds: {
			default: 'palette.neutral[10]',
		},
	},
};
