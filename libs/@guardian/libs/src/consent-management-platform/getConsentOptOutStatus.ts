import type { ConsentState, GetConsentOptOutStatus } from './types';

export const getConsentOptOutStatus: GetConsentOptOutStatus = (
	consent: ConsentState,
) => {
	// only show status for US jurisdiction
	if (!consent.usnat) {
		return '';
	}

	// check explicit opt-out via CMP UI or Sourcepoint-honoured GPC signal
	if (consent.usnat.doNotSell) {
		return 'You have opted out of the sale/sharing of personal information (opt-out request honoured)';
	}

	// if no explicit opt-out via CMP UI and Sourcepoint hasn't set doNotSell according to GPC signal,
	// fallback to value of GPC signal
	if (consent.gpcSignal) {
		return 'You have opted out of the sale/sharing of personal information via Global Privacy Control (opt-out request honoured)';
	}

	return 'You have not opted out of the sale/sharing of personal information';
};
