import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ChartAtom } from './ChartAtom';
import { html } from './fixtures/chartAtoms';

describe('ChartAtom', () => {
	it('should render', () => {
		const { getByTestId } = render(<ChartAtom id="123abc" html={html} />);

		expect(getByTestId('chart')).toBeInTheDocument();
	});
});
