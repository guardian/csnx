import type { ConsentState, GetConsentOptOutStatus } from './types';

export const getConsentOptOutStatus: GetConsentOptOutStatus = (
	consent: ConsentState,
) => {
	// only show status for US jurisdiction
	if (!consent.usnat) {
		return '';
	}

	if (consent.usnat.doNotSell) {
		return 'You have opted out of the sale/sharing of personal information (opt-out request honoured)';
	}

	// If no explicit opt-out, fallback to GPC signal
	if (consent.gpcSignal) {
		return 'You have opted out of the sale/sharing of personal information via Global Privacy Control (opt-out request honoured)';
	}
	return 'You have not opted out of the sale/sharing of personal information';
};
