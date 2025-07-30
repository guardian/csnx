import type { Meta, StoryObj } from '@storybook/react';
import { Byline } from './Byline';
import { contributors } from './contributors-fixture';
import type { TaggedContributor } from './lib';

const searchContributors = (
	selectedText: string,
): Promise<TaggedContributor[]> => {
	return new Promise<TaggedContributor[]>((resolve) => {
		const results = contributors
			.filter((name) => name.toLowerCase().includes(selectedText.toLowerCase()))
			.map((name, index) => ({
				id: `profile/${name.toLowerCase().replace(/\s/g, '-')}`,
				label: name,
				type: 'Contributor',
				internalId: index + 1,
			}))
			.slice(0, 20);

		return resolve(results);
	});
};

const disableSnapshot = {
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const meta = {
	title: 'Flexible-Frontend/Components/Byline',
	component: Byline,
	parameters: {},
	args: {
		handleSave: () => {},
		initialValue: [],
		searchContributors,
	},
} satisfies Meta<typeof Byline>;

type Story = StoryObj<typeof Byline>;

export const Default = {} satisfies Story;

export const WithTheme = {
	args: {
		allowUntaggedContributors: true,
		searchContributors,
		theme: {
			editor: {
				color: 'rgba(255, 255, 255, 0.87)',
				background: 'rgb(51, 51, 51)',
				border: '1px solid rgb(173, 216, 230)',
				chip: {
					color: 'initial',
					taggedBackground: 'rgb(173, 216, 230)',
					border: '1px solid rgb(173, 216, 230)',
					borderRadius: '3px',
					padding: '5.5px 7px',
					untagged: {
						color: 'rgba(255, 255, 255, 0.87)',
					},
				},
			},
			dropdown: {
				background: 'rgb(36, 36, 36)',
				li: {
					color: 'rgba(255, 255, 255, 0.87)',
					borderBottom: 'none',
					selected: {
						color: 'rgba(255, 255, 255, 0.87)',
						background: 'rgb(51, 51, 51)',
					},
				},
			},
		},
	},
} satisfies Story;

export const WithUntaggedContributors = {
	args: {
		allowUntaggedContributors: true,
	},
	...disableSnapshot,
} satisfies Story;

export const WithInitialValue = {
	args: {
		allowUntaggedContributors: true,
		initialValue: [
			{
				type: 'contributor',
				value: 'Joe Bloggs',
				tagId: 'profile/joebloggs',
				tagInternalId: '1',
			},
			{
				type: 'text',
				value: ' in London, ',
			},
			{
				type: 'contributor',
				value: 'Jane Doe',
			},
			{
				type: 'text',
				value: ' in New York',
			},
		],
	},
} satisfies Story;

export const WithNoSearch = {
	args: {
		allowUntaggedContributors: true,
		searchContributors: undefined,
	},
	...disableSnapshot,
} satisfies Story;

export const WithNoSearchAndNoUntagged = {
	args: {
		allowUntaggedContributors: false,
		searchContributors: undefined,
	},
	...disableSnapshot,
} satisfies Story;

export const WithCustomPlaceholder = {
	args: {
		allowUntaggedContributors: true,
		placeholder: 'A custom placeholder...',
	},
} satisfies Story;

export const WithContributorLimit = {
	args: { contributorLimit: 1 },
	...disableSnapshot,
} satisfies Story;

export default meta;
