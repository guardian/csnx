const units = {
	second: 1_000,
	minute: 60_000,
	hour: 3_600_000,
	day: 86_400_000,
} as const satisfies Record<string, number>;

export const duration = ({
	then,
	now,
}: {
	then: number;
	now: number;
}): { length: number; unit: keyof typeof units } => {
	const difference = now - then;
	if (difference < units.minute) {
		return { length: difference / units.second, unit: 'second' };
	}
	if (difference < units.hour) {
		return { length: difference / units.minute, unit: 'minute' };
	}
	if (difference < units.day) {
		return { length: difference / units.hour, unit: 'hour' };
	}
	return { length: difference / units.day, unit: 'day' };
};

const isYesterday = (then: number, now: number): boolean => {
	const today = new Date(now);
	const yesterday = new Date(now);
	yesterday.setDate(today.getDate() - 1);
	return new Date(then).toDateString() === yesterday.toDateString();
};

const withTime = (date: Date): string =>
	`${date.getHours()}.${date.getMinutes().toString().padStart(2, '0')}`;

/**
 * Takes an absolute date in [epoch format] and returns a string representing
 * relative time ago.
 *
 * Time is formatted according to [the Guardian and Observer Style Guide (T)][T]
 *
 * @param {number} epoch The date when an event happened in epoch format
 * @param {Object} [options] Options to control the formatting
 * @returns {string | false} A formatted relative time string, or `false` if the epoch is in the future
 *
 * [epoch format]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#description
 * [T]: https://www.theguardian.com/guardian-observer-style-guide-t
 */
export const timeAgo = (
	epoch: number,
	options?: {
		verbose?: boolean;
		daysUntilAbsolute?: number;
		now?: number;
	},
): false | string => {
	const then = epoch;
	const now = options?.now ?? Date.now();

	const verbose = options?.verbose ?? false;

	const { length: rawLength, unit } = duration({ then, now });
	const length = Math.round(rawLength);

	// Dates in the future are not supported
	if (length < 0) {
		return false;
	}

	switch (unit) {
		case 'second': {
			if (length > 55) {
				return verbose ? '1 minute ago' : '1m ago';
			}
			if (length < 15) {
				return 'now';
			}
			if (!verbose) {
				return `${length}s ago`;
			}
			return `${length} seconds ago`;
		}
		case 'minute': {
			if (length > 55) {
				return verbose ? '1 hour ago' : '1h ago';
			}
			if (!verbose) {
				return `${length}m ago`;
			}
			if (length == 1) {
				return '1 minute ago';
			}
			return `${length} minutes ago`;
		}
		case 'hour': {
			if (!verbose) {
				return `${length}h ago`;
			}
			if (length == 1) {
				return '1 hour ago';
			}
			return `${length} hours ago`;
		}
		case 'day': {
			if (rawLength < (options?.daysUntilAbsolute ?? 7)) {
				if (!verbose) {
					return `${length}d ago`;
				}
				if (isYesterday(then, now)) {
					return `Yesterday ${withTime(new Date(then))}`;
				}
				if (length == 1) {
					return '1 day ago';
				}
				return `${length} days ago`;
			}

			// Simple date - "9 Nov 2019"
			return new Date(then).toLocaleString('en-GB', {
				day: 'numeric',
				month: verbose ? 'long' : 'short',
				year: 'numeric',
			});
		}
	}
};
