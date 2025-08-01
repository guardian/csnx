import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Byline } from './Byline';
import { contributors } from './contributors-fixture';
import type { BylineModel } from './lib';
import type { TaggedContributor } from './lib';

const searchContributors = (
	selectedText: string,
): Promise<TaggedContributor[]> => {
	return new Promise<TaggedContributor[]>((resolve) => {
		const results = contributors
			.filter((name) => name.toLowerCase().includes(selectedText.toLowerCase()))
			.map((name, index) => ({
				path: `profile/${name.toLowerCase().replace(/\s/g, '-')}`,
				label: name,
				type: 'Contributor',
				tagId: `${index + 1}`,
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
		enablePreview: true,
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
				tagId: '1',
				path: 'profile/joebloggs',
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

export const WithoutPreview = {
	args: {
		allowUntaggedContributors: true,
		enablePreview: false,
	},
	...disableSnapshot,
} satisfies Story;

export const WithTextTyped = {
	args: {
		placeholder: 'My placeholder',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const editor = canvas.getByRole('combobox');

		const placeholder = await canvas.findByText('My placeholder');
		await expect(placeholder).toBeInTheDocument();

		await userEvent.click(editor);
		await userEvent.type(editor, 'Test');

		await expect(placeholder).not.toBeInTheDocument();
	},
} satisfies Story;

export const WithMockSave = {
	args: {
		handleSave: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const editor = canvas.getByRole('combobox');

		await userEvent.click(editor);
		await userEvent.type(editor, 'Test');
		await expect(args.handleSave).toBeCalledTimes(4);
	},
} satisfies Story;

const saveLog: BylineModel[] = [];
export const WithMockSaveLog = {
	args: {
		handleSave: (savedModel: BylineModel) => {
			saveLog.push(savedModel);
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const editor = canvas.getByRole('combobox');

		await userEvent.click(editor);
		await userEvent.type(editor, 'Test');
		await expect(saveLog.at(0)?.pop()?.value).toBe('T');
		await expect(saveLog.at(1)?.pop()?.value).toBe('Te');
		await expect(saveLog.at(2)?.pop()?.value).toBe('Tes');
		await expect(saveLog.at(3)?.pop()?.value).toBe('Test');
	},
} satisfies Story;

export default meta;
