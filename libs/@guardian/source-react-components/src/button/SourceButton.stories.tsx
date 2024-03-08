import type { Meta, StoryFn } from '@storybook/react';
import './source-button';

const meta: Meta = {
	title: 'SourceButton',
	args: {},
};

export default meta;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'source-button': SourceButtonProps;
		}
	}
}

interface SourceButtonProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {}

export const Default: StoryFn = () => <source-button>Subscribe</source-button>;
