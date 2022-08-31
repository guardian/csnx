import MockDate from 'mockdate';
import { timeAgo } from './timeAgo';

describe('timeAgo', () => {
	beforeAll(() => {
		MockDate.set('Sun Nov 17 2019 12:00:00 GMT+0000 (Greenwich Mean Time)');
	});

	afterAll(() => {
		MockDate.reset();
	});

	it('returns a short date string for older dates', () => {
		const older = new Date(Date.UTC(2019, 1, 1)).getTime();
		expect(timeAgo(older)).toBe('1 Feb 2019');
	});

	it('returns "now" when within 15 seconds', () => {
		const fourteenSecondsAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 59, 46),
		).getTime();
		expect(timeAgo(fourteenSecondsAgo)).toBe('now');
	});

	it('returns seconds for very recent dates', () => {
		const secondsAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 59, 30),
		).getTime();
		expect(timeAgo(secondsAgo)).toBe('30s ago');
	});

	it('returns minutes for slightly recent dates', () => {
		const fiveMinutesAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 55, 0),
		).getTime();
		expect(timeAgo(fiveMinutesAgo)).toBe('5m ago');
	});

	it('returns hours for dates within the last 24 hours', () => {
		const twoHoursAgo = new Date(
			Date.UTC(2019, 10, 17, 10, 0, 0),
		).getTime();
		expect(timeAgo(twoHoursAgo)).toBe('2h ago');
	});

	it('returns days for dates within one week', () => {
		const twoDaysAgo = new Date(Date.UTC(2019, 10, 15, 13, 0, 0)).getTime();
		expect(timeAgo(twoDaysAgo)).toBe('2d ago');
	});

	it('returns an absolute date for dates over a week old', () => {
		const eightDaysAgo = new Date(
			Date.UTC(2019, 10, 9, 13, 0, 0),
		).getTime();

		expect(timeAgo(eightDaysAgo)).toBe('9 Nov 2019');
	});

	it('returns a longer absolute date when verbose is true', () => {
		const eightDaysAgo = new Date(
			Date.UTC(2019, 10, 9, 13, 0, 0),
		).getTime();

		expect(
			timeAgo(eightDaysAgo, {
				verbose: true,
			}),
		).toBe('9 November 2019');
	});

	it('returns "yesterday" only when verbose option given', () => {
		const yesterday = new Date(Date.UTC(2019, 10, 16, 3, 0, 0)).getTime();

		expect(timeAgo(yesterday)).toBe('1d ago');
		expect(timeAgo(yesterday, { verbose: true })).toBe('Yesterday 3.00');
	});

	it('does not pluralise the unit when the delta is one', () => {
		const oneMinuteAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 59, 0),
		).getTime();
		const oneHourAgo = new Date(Date.UTC(2019, 10, 17, 11, 0, 0)).getTime();
		const oneDayAgo = new Date(Date.UTC(2019, 10, 16, 12, 0, 0)).getTime();

		expect(timeAgo(oneHourAgo)).toBe('1h ago');
		expect(
			timeAgo(oneHourAgo, {
				verbose: true,
			}),
		).toBe('1 hour ago');

		expect(timeAgo(oneMinuteAgo)).toBe('1m ago');
		expect(
			timeAgo(oneMinuteAgo, {
				verbose: true,
			}),
		).toBe('1 minute ago');

		expect(timeAgo(oneDayAgo)).toBe('1d ago');
		expect(
			timeAgo(oneDayAgo, {
				verbose: true,
			}),
		).toBe('Yesterday 12.00');
	});

	it('returns verbose format for seconds when this option is given', () => {
		const twentySecondsAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 59, 40),
		).getTime();
		expect(
			timeAgo(twentySecondsAgo, {
				verbose: true,
			}),
		).toBe('20 seconds ago');
	});

	it('returns verbose format for minutes when this option is given', () => {
		const fiveMinutesAgo = new Date(
			Date.UTC(2019, 10, 17, 11, 55, 0),
		).getTime();
		expect(
			timeAgo(fiveMinutesAgo, {
				verbose: true,
			}),
		).toBe('5 minutes ago');
	});

	it('returns verbose format for hours when this option is given', () => {
		const twoHoursAgo = new Date(
			Date.UTC(2019, 10, 17, 10, 0, 0),
		).getTime();
		expect(
			timeAgo(twoHoursAgo, {
				verbose: true,
			}),
		).toBe('2 hours ago');
	});

	it('returns verbose format for days when this option is given', () => {
		const twoDaysAgo = new Date(Date.UTC(2019, 10, 15, 10, 0, 0)).getTime();
		expect(
			timeAgo(twoDaysAgo, {
				verbose: true,
			}),
		).toBe('2 days ago');
	});

	it('still returns a relative string for dates yesterday if within 24hs', () => {
		const twentyHoursAgo = new Date(
			Date.UTC(2019, 10, 16, 16, 0, 0),
		).getTime();
		expect(timeAgo(twentyHoursAgo)).toBe('20h ago');
	});

	it('still returns an verbose relative string for dates yesterday if within 24hs', () => {
		const twentyHoursAgo = new Date(
			Date.UTC(2019, 10, 16, 16, 0, 0),
		).getTime();
		expect(
			timeAgo(twentyHoursAgo, {
				verbose: true,
			}),
		).toBe('20 hours ago');
	});

	it('still returns "yesterday" when epoch is the previous day but only if over 24hrs', () => {
		const thirtyHoursAgo = new Date(
			Date.UTC(2019, 10, 16, 6, 0, 0),
		).getTime();
		expect(
			timeAgo(thirtyHoursAgo, {
				verbose: true,
			}),
		).toBe('Yesterday 6.00');
	});

	it('returns absolute format dates for dates over one week ago, regardless of options', () => {
		const oneMonthAgo = new Date(Date.UTC(2019, 9, 17, 13, 0, 0)).getTime();
		expect(timeAgo(oneMonthAgo)).toBe('17 Oct 2019');
		expect(timeAgo(oneMonthAgo, { verbose: false })).toBe('17 Oct 2019');
		expect(timeAgo(oneMonthAgo, { verbose: true })).toBe('17 October 2019');
	});

	it('returns days when within 5 days', () => {
		const twoDaysAgo = new Date(Date.UTC(2019, 10, 15, 13, 0, 0)).getTime();
		const fourDaysAgo = new Date(
			Date.UTC(2019, 10, 13, 13, 0, 0),
		).getTime();
		const fiveDaysAgo = new Date(
			Date.UTC(2019, 10, 12, 13, 0, 0),
		).getTime();
		expect(timeAgo(twoDaysAgo)).toBe('2d ago');
		expect(timeAgo(fourDaysAgo)).toBe('4d ago');
		expect(timeAgo(fiveDaysAgo)).toBe('5d ago');
	});

	it('returns absolute dates after 7 days', () => {
		const sevenDaysAgo = new Date(
			Date.UTC(2019, 10, 10, 13, 0, 0),
		).getTime();
		const eightDaysAgo = new Date(
			Date.UTC(2019, 10, 9, 13, 0, 0),
		).getTime();
		expect(timeAgo(sevenDaysAgo)).toBe('7d ago');
		expect(timeAgo(eightDaysAgo)).toBe('9 Nov 2019');
	});

	it('correctly changes format based on the daysUntilAbsolute option', () => {
		const tenDaysAgo = new Date(Date.UTC(2019, 10, 7, 13, 0, 0)).getTime();
		expect(timeAgo(tenDaysAgo)).toBe('7 Nov 2019');
		expect(timeAgo(tenDaysAgo, { daysUntilAbsolute: 14 })).toBe('10d ago');
	});

	it('defaults to a simple date format for dates over 1 week old', () => {
		const eightDaysAgo = new Date(
			Date.UTC(2019, 10, 9, 13, 0, 0),
		).getTime();
		const aWhileBack = new Date(Date.UTC(2017, 3, 2, 17, 0, 0)).getTime();
		expect(timeAgo(eightDaysAgo)).toBe('9 Nov 2019');
		expect(timeAgo(aWhileBack)).toBe('2 Apr 2017');
	});

	it('returns false on future dates', () => {
		const tomorrow = new Date(Date.UTC(2019, 10, 18, 10, 0, 0)).getTime();
		expect(timeAgo(tomorrow)).toBe(false);
	});
});
