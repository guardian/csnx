import { calculateHoverColour } from './hoverColour';

describe('calculateHoverColor background colours', () => {
	it('returns 20% lighter color for very dark background colors', () => {
		const veryDark = '#121212';

		const hoverColour = calculateHoverColour(veryDark);

		expect(hoverColour).toBe('#454545');
	});

	it('returns 8% darker color for dark background colors', () => {
		const dark = '#052962';

		const hoverColour = calculateHoverColour(dark);

		expect(hoverColour).toBe('#03183A');
	});

	it('returns 5% darker color for medium background colors', () => {
		const medium = '#506991';

		const hoverColour = calculateHoverColour(medium);

		expect(hoverColour).toBe('#475D80');
	});

	it('returns 7% darker color for light background colors', () => {
		const light = '#C1D8FC';

		const hoverColour = calculateHoverColour(light);

		expect(hoverColour).toBe('#9EC1FA');
	});

	it('returns 10% darker color for very light background colors', () => {
		const veryLight = '#FFFFFF';

		const hoverColour = calculateHoverColour(veryLight);

		expect(hoverColour).toBe('#E6E6E6');
	});

	it('returns some fallback for invalid hex values', () => {
		const invalid = 'invalid';

		const hoverColour = calculateHoverColour(invalid);

		expect(hoverColour).toBe('#333333');
	});
});

describe('calculateHoverColor transparent backgrounds', () => {
	it('returns the border colour with 10% opacity for darker border', () => {
		const transparent = 'transparent';
		const borderColour = '#052962';

		const hoverColour = calculateHoverColour(transparent, borderColour);

		expect(hoverColour).toBe('rgba(5, 41, 98, 0.1)');
	});

	it('returns the border colour with 15% opacity for lighter border', () => {
		const transparent = 'transparent';
		const borderColour = '#FFE500';

		const hoverColour = calculateHoverColour(transparent, borderColour);

		expect(hoverColour).toBe('rgba(255, 229, 0, 0.15)');
	});

	it('returns the border colour with 20% opacity for lighest border', () => {
		const transparent = 'transparent';
		const borderColour = '#FFFFFF';

		const hoverColour = calculateHoverColour(transparent, borderColour);

		expect(hoverColour).toBe('rgba(255, 255, 255, 0.2)');
	});
});
