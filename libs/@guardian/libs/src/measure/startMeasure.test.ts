import { startMeasure } from './startMeasure';

describe('measure', () => {
	it('can perform a measurement', () => {
		const { endMeasure } = startMeasure('dotcom', 'Some Event');
		const duration = endMeasure();
		expect(duration).toBe(-1);
	});
});
