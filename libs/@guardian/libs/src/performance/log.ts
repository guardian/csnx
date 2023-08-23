import { getSubscriptions, messageStyle } from '../logger/log';

export const logPerf = (measurement: string, duration: number) => {
	if (!getSubscriptions().includes('perf')) return;

	const styles = [
		messageStyle('common'),
		'',
		messageStyle('perf'),
		'',
		`font-weight: bold;`,
	];

	console.log(`%c@guardian%c %c${measurement}%c %c${duration}ms`, ...styles);
};
