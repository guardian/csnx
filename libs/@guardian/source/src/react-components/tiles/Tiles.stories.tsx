import { breakpoints } from '../../foundations';
import type { Meta, StoryObj } from '@csnx/storybooks/react';
import { Tiles } from './Tiles';

const meta: Meta<typeof Tiles> = {
	title: 'React Components/Tiles',
	component: Tiles,
};

export default meta;
type Story = StoryObj<typeof Tiles>;

const Template: Story = {
	render: (args) => (
		<Tiles {...args}>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus
				nibh erat, eget rutrum ligula vehicula sit amet. Etiam scelerisque
				dapibus pulvinar. Integer non accumsan justo. Duis et vehicula risus.
				Nulla ligula eros, consequat sodales lectus eget, eleifend venenatis
				neque.
			</div>
			<div>
				Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla
				facilisi. Phasellus id aliquam odio. Aliquam tempus eu enim in
				fermentum. Donec ut velit vel purus rutrum vulputate ut scelerisque
				lacus.
			</div>
			<div>
				Pellentesque id ornare turpis. Aliquam laoreet aliquet pharetra. Donec
				nec erat ac libero interdum sollicitudin. Nullam imperdiet ut dolor non
				cursus. Integer et ante fringilla, luctus magna nec, consequat est.
			</div>
			<div>
				Nunc nec dapibus quam. Praesent nec neque vel velit mollis tempor.
				Suspendisse justo eros, pharetra et elit sit amet, hendrerit laoreet
				dui. Curabitur ut libero nibh. Duis finibus sollicitudin tortor, ac
				viverra urna commodo et.
			</div>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non igitur
				potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Hoc
				Hieronymus summum bonum esse dixit.
			</div>
		</Tiles>
	),
};

export const Columns2: Story = {
	...Template,
	args: {
		columns: 2,
	},
};

export const Columns3: Story = {
	...Template,
	args: {
		columns: 3,
	},
};

export const Columns4: Story = {
	...Template,
	args: {
		columns: 4,
	},
};

export const Columns5: Story = {
	...Template,
	args: {
		columns: 5,
	},
};

export const Columns5CollapseUntilTabletAtMobile: Story = {
	...Template,
	args: {
		columns: 5,
		collapseUntil: 'tablet',
	},
	parameters: {
		viewport: { defaultViewport: 'mobile' },
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
};

export const Columns5CollapseUntilTabletAtTablet: Story = {
	...Template,
	args: {
		columns: 5,
		collapseUntil: 'tablet',
	},
	parameters: {
		viewport: { defaultViewport: 'tablet' },
		chromatic: {
			viewports: [breakpoints.tablet],
		},
	},
};
