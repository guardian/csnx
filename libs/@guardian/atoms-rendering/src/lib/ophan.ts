import type { OphanComponentEvent } from '@guardian/libs';

type OphanRecordFunction = (event: Record<string, unknown>) => void;

const getOphanRecordFunction = (): OphanRecordFunction => {
	const record = window?.guardian?.ophan?.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return () => {};
};

export const submitComponentEvent = (
	componentEvent: OphanComponentEvent,
): void => {
	const record = getOphanRecordFunction();
	record({ componentEvent });
};
