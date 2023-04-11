export const getShortDomain = ({ isCrossSubdomain = false } = {}) => {
	const domain = document.domain || '';

	if (domain === 'localhost' || window.guardian?.config?.page?.isPreview) {
		return domain;
	}

	// Trim any possible subdomain (will be shared with supporter, identity, etc)
	if (isCrossSubdomain) {
		return ['', ...domain.split('.').slice(-2)].join('.');
	}
	// Trim subdomains for prod (www.theguardian), code (m.code.dev-theguardian) and dev (dev.theguardian, m.thegulocal)
	return domain.replace(/^(www|m\.code|dev|m)\./, '.');
};
