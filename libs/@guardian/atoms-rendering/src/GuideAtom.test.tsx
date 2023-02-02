import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { defaultStory } from './fixtures/guideAtom';
import { GuideAtom } from './GuideAtom';

describe('GuideAtom', () => {
	it('should render', () => {
		const { getByText, queryByText } = render(<GuideAtom {...defaultStory} />);

		expect(getByText('Quick Guide')).toBeInTheDocument();

		// Test that the 'Show' part of the expand switch is hidden on expand
		expect(getByText('Show')).toBeInTheDocument();
		fireEvent.click(getByText('Show'));
		expect(queryByText('Show')).toBe(null);
		// Test that 'Hide' is hidden after closing the Guide
		expect(getByText('Hide')).toBeInTheDocument();
		fireEvent.click(getByText('Hide'));
		expect(queryByText('Hide')).toBe(null);
	});

	it('Show feedback on like', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<GuideAtom {...defaultStory} />,
		);

		// Expand Guide
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('like')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire like event
		fireEvent.click(queryByTestId('like') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('like')).not.toBeVisible();
	});

	it('Show feedback on dislike', () => {
		const { getByText, queryByText, queryByTestId } = render(
			<GuideAtom {...defaultStory} />,
		);

		// Expand Guide
		fireEvent.click(getByText('Show'));
		// Like button should be visibile and feedback not visibile
		expect(queryByTestId('dislike')).toBeVisible();
		expect(queryByText('Thank you for your feedback.')).not.toBeVisible();

		// Fire dislike event
		fireEvent.click(queryByTestId('dislike') as HTMLElement);
		// Feedback should be visible, like button should be hidden
		expect(queryByText('Thank you for your feedback.')).toBeVisible();
		expect(queryByTestId('dislike')).not.toBeVisible();
	});
});
