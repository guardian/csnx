import { isSubscribedTo, messageStyle } from '../logger/logger';

export const logPerf = (measurement: string, duration: number) => {
	if (!isSubscribedTo('perf')) return;

	const styles = [
		messageStyle('common'),
		'',
		messageStyle('perf'),
		'',
		`font-weight: bold;`,
	];

	console.log(`%c@guardian%c %c${measurement}%c %c${duration}ms`, ...styles);
};
