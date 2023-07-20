import { startPerformanceMeasure } from './startPerformanceMeasure';

describe('measure', () => {
	it('can perform a measurement', () => {
		const { endPerformanceMeasure } = startPerformanceMeasure(
			'dotcom',
			'Some Event',
		);
		const duration = endPerformanceMeasure();
		expect(duration).toBe(-1);
	});
});
