import type { Meta, StoryFn } from '@storybook/react';
import './source-button';

const meta: Meta = {
	title: 'SourceButton',
	args: {},
};

export default meta;

export const Default: StoryFn = () => <source-button>Subscribe</source-button>;
