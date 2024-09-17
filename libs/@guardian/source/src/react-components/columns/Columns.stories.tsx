import type { Meta, StoryObj } from '@csnx/storybooks/react';
import type { HTMLAttributes } from 'react';
import { breakpoints } from '../../foundations';
import { Container } from '../container/Container';
import { Column } from './Column';
import { Columns } from './Columns';

const meta: Meta<typeof Column> = {
	title: 'React Components/Columns',
	component: Columns,
};

export default meta;
type Story = StoryObj<typeof Columns>;

const style = { backgroundColor: 'rgba(255, 0, 0, 0.25)' };
const Code = (args: HTMLAttributes<HTMLElement>) => (
	<code style={{ whiteSpace: 'nowrap' }} {...args} />
);

const Template: Story = {
	render: (args) => (
		<Columns {...args} style={style}>
			<Column style={style}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus
				nibh erat, eget rutrum ligula vehicula sit amet. Etiam scelerisque
				dapibus pulvinar. Integer non accumsan justo. Duis et vehicula risus.
				Nulla ligula eros, consequat sodales lectus eget, eleifend venenatis
				neque.
			</Column>
			<Column style={style}>
				Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla
				facilisi. Phasellus id aliquam odio. Aliquam tempus eu enim in
				fermentum. Donec ut velit vel purus rutrum vulputate ut scelerisque
				lacus.
			</Column>
			<Column style={style}>
				Pellentesque id ornare turpis. Aliquam laoreet aliquet pharetra. Donec
				nec erat ac libero interdum sollicitudin. Nullam imperdiet ut dolor non
				cursus. Integer et ante fringilla, luctus magna nec, consequat est.
			</Column>
			<Column style={style}>
				Nunc nec dapibus quam. Praesent nec neque vel velit mollis tempor.
				Suspendisse justo eros, pharetra et elit sit amet, hendrerit laoreet
				dui. Curabitur ut libero nibh. Duis finibus sollicitudin tortor, ac
				viverra urna commodo et.
			</Column>
			<Column style={style}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non igitur
				potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Hoc
				Hieronymus summum bonum esse dixit.
			</Column>
		</Columns>
	),
};

export const Default: Story = {
	...Template,
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
		layout: 'fullscreen',
		outline: true,
	},
};

export const CollapseUntilTabletWithNoSpacing: Story = {
	...Template,
	args: {
		collapseUntil: 'tablet',
	},
	parameters: {
		...Default.parameters,
		viewport: { defaultViewport: 'phablet' },
		chromatic: {
			viewports: [breakpoints.phablet],
		},
	},
};

export const CollapseUntilTabletWithSpace1: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 1,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace2: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 2,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace3: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 3,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace4: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 4,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace5: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 5,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace6: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 6,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace9: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 9,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace12: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 12,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const CollapseUntilTabletWithSpace24: Story = {
	...Template,
	args: {
		...CollapseUntilTabletWithNoSpacing.args,
		spaceY: 24,
	},
	parameters: {
		...CollapseUntilTabletWithNoSpacing.parameters,
	},
};

export const WithContainer: Story = {
	render: (args) => (
		<Container style={style}>
			<Columns {...args} style={style}>
				<Column style={style}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus
					nibh erat, eget rutrum ligula vehicula sit amet. Etiam scelerisque
					dapibus pulvinar. Integer non accumsan justo. Duis et vehicula risus.
					Nulla ligula eros, consequat sodales lectus eget, eleifend venenatis
					neque.
				</Column>
				<Column style={style}>
					Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla
					facilisi. Phasellus id aliquam odio. Aliquam tempus eu enim in
					fermentum. Donec ut velit vel purus rutrum vulputate ut scelerisque
					lacus.
				</Column>
				<Column style={style}>
					Pellentesque id ornare turpis. Aliquam laoreet aliquet pharetra. Donec
					nec erat ac libero interdum sollicitudin. Nullam imperdiet ut dolor
					non cursus. Integer et ante fringilla, luctus magna nec, consequat
					est.
				</Column>
				<Column style={style}>
					Nunc nec dapibus quam. Praesent nec neque vel velit mollis tempor.
					Suspendisse justo eros, pharetra et elit sit amet, hendrerit laoreet
					dui. Curabitur ut libero nibh. Duis finibus sollicitudin tortor, ac
					viverra urna commodo et.
				</Column>
				<Column style={style}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non igitur
					potestis voluptate omnia dirigentes aut tueri aut retinere virtutem.
					Hoc Hieronymus summum bonum esse dixit.
				</Column>
			</Columns>
		</Container>
	),
	parameters: {
		layout: 'fullscreen',
	},
};

export const ResponsiveAtPhablet: Story = {
	render: (args) => (
		<Container style={style}>
			<Columns {...args}>
				<Column width={[1 / 2, 1 / 4]} style={style}>
					<p>default 50% wide, 25% from tablet</p>
					<Code>{'width={[1 / 2, 1 / 4]}'}</Code>
				</Column>
				<Column width={[1 / 2, 3 / 4]} style={style}>
					<p>default 50% wide, 75% from tablet</p>
					<Code>{'width={[1 / 2, 3 / 4]}'}</Code>
				</Column>
			</Columns>
		</Container>
	),
	parameters: {
		viewport: { defaultViewport: 'phablet' },
		chromatic: {
			viewports: [breakpoints.phablet],
		},
		layout: 'fullscreen',
		outline: true,
	},
};

export const ResponsiveAtTablet: Story = {
	render: (args) => (
		<Container style={style}>
			<Columns {...args}>
				<Column width={[1 / 2, 1 / 4]} style={style}>
					<p>default 50% wide, 25% from tablet</p>
					<Code>{'width={[1 / 2, 1 / 4]}'}</Code>
				</Column>
				<Column width={[1 / 2, 3 / 4]} style={style}>
					<p>default 50% wide, 75% from tablet</p>
					<Code>{'width={[1 / 2, 3 / 4]}'}</Code>
				</Column>
			</Columns>
		</Container>
	),
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
		layout: 'fullscreen',
	},
};

export const ResponsiveHideAtTablet: Story = {
	render: (args) => (
		<Container style={style}>
			<Columns {...args}>
				<Column width={[0, 1 / 4]} style={style}>
					<p>hidden at mobile, 25% from tablet</p>
					<Code>{'width={[0, 1 / 4]}'}</Code>
				</Column>
				<Column width={[1, 3 / 4]} style={style}>
					<p>default 100% wide, 75% from tablet</p>
					<Code>{'width={[1, 3 / 4]}'}</Code>
				</Column>
			</Columns>
		</Container>
	),
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
		layout: 'fullscreen',
	},
};

export const ResponsiveHideAtMobile: Story = {
	render: (args) => (
		<Container style={style}>
			<Columns {...args}>
				<Column width={[0, 1 / 4]} style={style}>
					<p>hidden at mobile, 25% from tablet</p>
					<Code>{'width={[0, 1 / 4]}'}</Code>
				</Column>
				<Column width={[1, 3 / 4]} style={style}>
					<p>default 100% wide, 75% from tablet</p>
					<Code>{'width={[1, 3 / 4]}'}</Code>
				</Column>
			</Columns>
		</Container>
	),
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
		layout: 'fullscreen',
	},
};

export const WithSpan: Story = {
	render: () => (
		<>
			<p>
				Elements with a <Code>{'span'}</Code> prop will scale at our{' '}
				<a href="https://theguardian.design/2a1e5182b/p/41be19-grids">
					established breakpoints
				</a>
				:
			</p>
			<Container style={style}>
				<Columns>
					<Column style={style} span={1}>
						<Code>{'span={1}'}</Code>
					</Column>
					<Column style={style} span={1}>
						<Code>{'span={1}'}</Code>
					</Column>
					<Column style={style} span={2}>
						<Code>{'span={2}'}</Code>
					</Column>
				</Columns>
			</Container>
			<p></p>
			<Container style={style}>
				<Columns>
					<Column style={style} span={2}>
						<Code>{'span={2}'}</Code>
					</Column>
					<Column style={style} />
					<Column style={style} span={1}>
						<Code>{'span={1}'}</Code>
					</Column>
				</Columns>
			</Container>
			<p>
				An array of <Code>{'span'}</Code> values can be specified for relevant
				breakpoints:
			</p>
			<Container style={style}>
				<Columns>
					<Column style={style} span={4}>
						<Code>{'span={4}'}</Code>
					</Column>
					<Column style={style} span={[0, 4, 4]}>
						<Code>{'span={[0, 4]}'}</Code>
					</Column>
					<Column style={style} span={[0, 4, 4, 6, 8]}>
						<Code>{'span={[0, 0, 4, 6, 8]}'}</Code>
					</Column>
				</Columns>
			</Container>
			<p>
				An element with a <Code>{'span'}</Code> will not extend beyond 100% of
				the browser width:
			</p>
			<Container style={style}>
				<Columns>
					<Column style={style} span={12}>
						<Code>{'span={12}'}</Code>
					</Column>
				</Columns>
			</Container>
			<p>
				A <Code>{'span'}</Code> of 0 will cause the element not to be displayed.
			</p>
			<Container style={style}>
				<Columns>
					<Column style={style}>*</Column>
					<Column style={style} span={[0, 0, 2]}>
						<Code>{'span={[0, 0, 2]}'}</Code>
					</Column>
					<Column style={style} span={[0, 0, 2]}>
						<Code>{'span={[0, 0, 2]}'}</Code>
					</Column>
				</Columns>
			</Container>
			<p>
				<Code>{'span'}</Code> is overruled by <Code>{'width'}</Code> prop:
			</p>
			<Container style={style}>
				<Columns>
					<Column style={style} span={2} width={3 / 4}>
						<Code>{'span={2} width={3 / 4}'}</Code>
					</Column>
					<Column style={style} width={1 / 4}>
						<Code>{'width={1 / 4}'}</Code>
					</Column>
				</Columns>
			</Container>
		</>
	),
	parameters: {
		layout: 'fullscreen',
	},
};

export const WithWidth: Story = {
	render: () => (
		<>
			<Container style={style}>
				<Columns>
					<Column width={1 / 4} style={style}>
						<Code>{'width={1 / 4}'}</Code>
					</Column>
					<Column style={style} />
					<Column style={style} />
				</Columns>
			</Container>
			<p></p>
			<Container style={style}>
				<Columns>
					<Column width={1 / 3} style={style}>
						<Code>{'width={1 / 3}'}</Code>
					</Column>
					<Column style={style} />
					<Column style={style} />
				</Columns>
			</Container>
			<p></p>
			<Container style={style}>
				<Columns>
					<Column width={1 / 2} style={style}>
						<Code>{'width={1 / 2}'}</Code>
					</Column>
					<Column style={style} />
					<Column style={style} />
				</Columns>
			</Container>
			<p></p>
			<Container style={style}>
				<Columns>
					<Column width={3 / 4} style={style}>
						<Code>{'width={3 / 4}'}</Code>
					</Column>
					<Column style={style} />
					<Column style={style} />
				</Columns>
			</Container>
		</>
	),
	parameters: {
		layout: 'fullscreen',
	},
};
