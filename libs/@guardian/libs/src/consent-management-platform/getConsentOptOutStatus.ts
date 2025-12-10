import type { ConsentState, GetConsentOptOutStatus } from './types';

export const getConsentOptOutStatus: GetConsentOptOutStatus = (
	consent: ConsentState,
) => {
	// only show status for US jurisdiction
	if (!consent.usnat) {
		return '';
	}

	// check explicit opt-out via CMP UI or Sourcepoint-honoured GPC signal (via the portal setting
	// “Respect Global Privacy Control”)
	if (consent.usnat.doNotSell) {
		return 'You have opted out of the sale/sharing of personal information (opt-out request honoured)';
	}

	return 'You have not opted out of the sale/sharing of personal information';
};
