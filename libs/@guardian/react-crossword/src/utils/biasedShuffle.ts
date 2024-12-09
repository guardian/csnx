import { isUndefined } from '@guardian/libs';

// This uses the Fisher Yates shuffle algorithm, but with a bias factor.
// The Math.min(i + 1, n / 2) ensures that the random index j
// is biased toward indices farther from the current index i.
// This encourages items to move farther from their original positions.

export const biasedShuffle = <T>(array: T[]): T[] => {
	const shuffled = [...array]; // Create a shallow copy of the array
	const n = shuffled.length;

	for (let i = n - 1; i > 0; i--) {
		// Use a bias factor but ensure the range includes all indices [0, i]
		const biasFactor = Math.max(1, Math.min(i + 1, Math.floor(n / 2)));
		const biasedJ = Math.max(0, i - Math.floor(Math.random() * biasFactor));

		const unbiasedJ = Math.floor(Math.random() * (i + 1));

		// Choose between full range and biased swap 50% chance to use bias
		const finalJ = Math.random() > 0.5 ? unbiasedJ : biasedJ;

		if (!isUndefined(shuffled[i])) {
			const temp = shuffled[i];
			if (!isUndefined(shuffled[finalJ]) && !isUndefined(temp)) {
				shuffled[i] = shuffled[finalJ];
				shuffled[finalJ] = temp;
			}
		}
	}

	return shuffled;
};
