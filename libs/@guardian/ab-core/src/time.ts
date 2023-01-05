// Ideally this would be in a npm lib folder
export const isExpired = (testExpiry: string | number | Date): boolean => {
	// Get the current time, we check that right now is not after the end of the text expiry
	const currentTime = new Date().valueOf();

	// Take the test expiry date and set the hours to the last millisecond of the day
	const theTestExpiry = new Date(testExpiry).setHours(23, 59, 59, 59);

	// If the endOfToday at 23:59:59 is after the test expiry date at the same time
	return currentTime > theTestExpiry;
};
