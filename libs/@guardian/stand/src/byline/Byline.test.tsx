import { act, render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { EditorView } from 'prosemirror-view';
import { mockEditorViewMethods } from '../../mocks/prosemirror-view';
import { Byline } from './Byline';
import type { BylineModel, TaggedContributor } from './lib';

jest.mock('prosemirror-view', () => {
	const actualProsemirrorView = jest.requireActual('prosemirror-view');
	const Class = actualProsemirrorView.EditorView as typeof EditorView;
	class MockEditorView extends Class {
		posAtCoords = mockEditorViewMethods.posAtCoords;
		coordsAtPos = mockEditorViewMethods.coordsAtPos;
	}
	return {
		...actualProsemirrorView,
		EditorView: MockEditorView,
	};
});

// Mock the offsetParent used for visibility in the test dom
// See https://github.com/jsdom/jsdom/issues/1261
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
	get() {
		return this.parentNode;
	},
});

const mockSearchContributors: (
	selectedText: string,
) => Promise<TaggedContributor[]> = () => {
	return Promise.resolve([
		{
			id: 'mahesh-makani',
			label: 'Mahesh Makani',
			type: 'tagged',
			internalId: 1,
		},
		{
			id: 'andrew-howe-ely',
			label: 'Andrew Howe-Ely',
			type: 'tagged',
			internalId: 2,
		},
	]);
};

describe('Byline editor', () => {
	it('shows dropdown with untagged contributor suggestion, hides when click away', async () => {
		const user = userEvent.setup();
		render(<Byline allowUntaggedContributors={true} handleSave={() => {}} />);

		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
		});

		const dropdown = screen.getByRole('listbox');
		expect(dropdown).toHaveTextContent('Add "Test" as untagged contributor');

		await act(async () => {
			await user.click(document.body);
		});
		expect(dropdown).not.toBeVisible();
	});
	it('adds a chip from the dropdown', async () => {
		const user = userEvent.setup();
		render(<Byline allowUntaggedContributors={true} handleSave={() => {}} />);

		const editor = screen.getByRole('combobox');
		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
			await user.click(screen.getByRole('option'));
		});

		const chip = editor.querySelector('chip[data-label="Test"]');
		expect(chip).toBeInTheDocument();
		expect(chip).toHaveTextContent('Test');
	});
	it('deletes a chip when clicking x', async () => {
		const user = userEvent.setup();
		render(<Byline allowUntaggedContributors={true} handleSave={() => {}} />);

		const editor = screen.getByRole('combobox');
		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
			await user.click(screen.getByRole('option'));
		});

		const chip = editor.querySelector('chip[data-label="Test"]');
		expect(chip).toBeInTheDocument();

		const deleteHander = screen.getByTitle('Delete Test');

		await act(async () => {
			await user.click(deleteHander);
		});
		expect(chip).not.toBeInTheDocument();
	});
	it('hides dropdown with escape key', async () => {
		const user = userEvent.setup();
		render(<Byline allowUntaggedContributors={true} handleSave={() => {}} />);

		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
		});

		const dropdown = screen.getByRole('listbox');
		expect(dropdown).toHaveTextContent('Add "Test" as untagged contributor');

		await act(async () => {
			await user.type(screen.getByRole('combobox'), '{Escape}');
		});
		expect(dropdown).not.toBeVisible();
	});
	it('displays placeholder text when no content is present', async () => {
		const user = userEvent.setup();
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={() => {}}
			/>,
		);

		const placeholder = await screen.findByText('Placeholder');
		expect(placeholder).toBeInTheDocument();

		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
		});

		expect(placeholder).not.toBeVisible();
	});
	it('renders search options in dropdown', async () => {
		const user = userEvent.setup();
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={() => {}}
				searchContributors={mockSearchContributors}
			/>,
		);

		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
		});

		const mahesh = screen.getByText('Mahesh Makani');
		expect(mahesh).toBeInTheDocument();
	});
	it('moves the selected option in dropdown with arrow keys', async () => {
		const user = userEvent.setup();
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={() => {}}
				searchContributors={mockSearchContributors}
			/>,
		);

		await act(async () => {
			await user.type(screen.getByRole('combobox'), 'Test');
			await user.type(screen.getByRole('combobox'), '{ArrowDown}');
			await user.type(screen.getByRole('combobox'), '{ArrowDown}');
		});

		const lastOption = screen.getAllByRole('option').pop();
		expect(lastOption).toHaveAttribute('aria-selected', 'true');
	});
	it('adds a chip with the Enter key', async () => {
		const user = userEvent.setup();
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={() => {}}
				searchContributors={mockSearchContributors}
			/>,
		);
		const editor = screen.getByRole('combobox');

		await act(async () => {
			await user.type(editor, 'Test');
			await user.type(editor, '{ArrowDown}');
			await user.type(editor, '{Enter}');
		});

		const chip = editor.querySelector('chip[data-label="Andrew Howe-Ely"]');
		expect(chip).toBeInTheDocument();
		expect(chip).toHaveTextContent('Andrew Howe-Ely');
	});
	it('executes save function on every keypress', async () => {
		const user = userEvent.setup();
		const mockHandleSave = jest.fn();
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={mockHandleSave}
				searchContributors={mockSearchContributors}
			/>,
		);
		const editor = screen.getByRole('combobox');

		await act(async () => {
			await user.type(editor, 'T');
			await user.type(editor, 'e');
			await user.type(editor, 's');
			await user.type(editor, 't');
		});

		expect(mockHandleSave).toHaveBeenCalledTimes(4);
	});
	it('executes save function with correct input at each keypress', async () => {
		const user = userEvent.setup();
		const saveLog: BylineModel[] = [];
		const mockHandleSave = (value: BylineModel) => {
			saveLog.push(value);
		};
		render(
			<Byline
				allowUntaggedContributors={true}
				placeholder="Placeholder"
				handleSave={mockHandleSave}
				searchContributors={mockSearchContributors}
			/>,
		);
		const editor = screen.getByRole('combobox');

		await act(async () => {
			await user.type(editor, 'T');
			await user.type(editor, 'e');
			await user.type(editor, 's');
			await user.type(editor, 't');
		});

		expect(saveLog.at(0)?.pop()?.value).toBe('T');
		expect(saveLog.at(1)?.pop()?.value).toBe('Te');
		expect(saveLog.at(2)?.pop()?.value).toBe('Tes');
		expect(saveLog.at(3)?.pop()?.value).toBe('Test');
	});
});
