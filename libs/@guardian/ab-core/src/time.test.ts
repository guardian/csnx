import { isExpired } from './time';

const oneDaySec = 60 * 60 * 24;

const startOfToday = new Date().setHours(0, 0, 0, 0).valueOf();

const startOfTomorrow = startOfToday + oneDaySec;
const startOfYesterday = startOfToday - oneDaySec;

describe('Check if isExpired', () => {
	it('isExpired is true if expired at the start of the day before', () => {
		const startOfYesterdayDate = new Date(startOfYesterday);
		const startOfYesterdayStr = startOfYesterdayDate.toString();
		expect(isExpired(startOfYesterdayDate)).toBeTruthy();
		expect(isExpired(startOfYesterdayStr)).toBeTruthy();
	});

	it('isExpired is true if the date is in the past', () => {
		expect(isExpired('1999-01-01')).toBeTruthy();
	});

	it('isExpired is false if it expires at the start of tomorrow', () => {
		const startOfTomorrowDate = new Date(startOfTomorrow);
		const startOfTomorrowStr = startOfTomorrowDate.toString();
		expect(isExpired(startOfTomorrowDate)).toBeFalsy();
		expect(isExpired(startOfTomorrowStr)).toBeFalsy();
	});

	it('isExpired is false if it the day of expiry', () => {
		const rightNowDate = new Date().valueOf().toString();
		const rightNowStr = rightNowDate.toString();
		expect(isExpired(rightNowDate)).toBeFalsy();
		expect(isExpired(rightNowStr)).toBeFalsy();
	});

	it('isExpired is false if the date passed is far future', () => {
		expect(isExpired('9999-01-01')).toBeFalsy();
	});
});
