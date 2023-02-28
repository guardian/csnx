import { UAParser } from './ua-parser.js';

/**
 * Convert version to a semver value.
 * - 2.5 -> 2.5.0
 * - 1 -> 1.0.0
 *
 * @type {(version: string | undefined | null) => string | null} */
const coerce = (version) => {
	if (!typeof version === 'string') return null;

	return version.split('.').concat(0, 0, 0).slice(0, 3).join('.');
};

/**
 * Adapted from https://github.com/browserslist/browserslist-useragent/blob/b767e4d53dc712715ca9fe2d0e440b755da652c2/index.ts#L26-L125, with a small change
 * to the wat the version is coerced.
 *
 * @type {(uaString: string) => { family: string | null; version: string | null }} */
function resolveUserAgent(uaString) {
	const parsedUA = UAParser(uaString);
	const parsedBrowserVersion = coerce(parsedUA.browser.version);
	const parsedOSVersion = coerce(parsedUA.os.version);
	const parsedEngineVersion = coerce(parsedUA.engine.version);

	// Case A: For Safari on iOS, the use the browser version
	if (parsedUA.browser.name === 'Safari' && parsedUA.os.name === 'iOS') {
		return {
			family: 'iOS',
			version: parsedBrowserVersion,
		};
	}

	// Case B: The browser on iOS didn't report as safari,
	// so we use the iOS version as a proxy to the browser
	// version. This is based on the assumption that the
	// underlying Safari Engine used will be *atleast* equal
	// to the iOS version it's running on.
	if (parsedUA.os.name === 'iOS') {
		return {
			family: 'iOS',
			version: parsedOSVersion,
		};
	}

	if (
		(parsedUA.browser.name === 'Opera' && parsedUA.device.type === 'mobile') ||
		parsedUA.browser.name === 'Opera Mobi'
	) {
		return {
			family: 'OperaMobile',
			version: parsedBrowserVersion,
		};
	}

	if (parsedUA.browser.name === 'Samsung Browser') {
		return {
			family: 'Samsung',
			version: parsedBrowserVersion,
		};
	}

	if (parsedUA.browser.name === 'IE') {
		return {
			family: 'Explorer',
			version: parsedBrowserVersion,
		};
	}

	if (parsedUA.browser.name === 'IEMobile') {
		return {
			family: 'ExplorerMobile',
			version: parsedBrowserVersion,
		};
	}

	// Use engine version for gecko-based browsers
	if (parsedUA.engine.name === 'Gecko') {
		return {
			family: 'Firefox',
			version: parsedEngineVersion,
		};
	}

	// Use engine version for blink-based browsers
	if (parsedUA.engine.name === 'Blink') {
		return {
			family: 'Chrome',
			version: parsedEngineVersion,
		};
	}

	// Chrome based browsers pre-blink (WebKit)
	if (
		parsedUA.browser.name &&
		['Chrome', 'Chromium', 'Chrome WebView', 'Chrome Headless'].includes(
			parsedUA.browser.name,
		)
	) {
		return {
			family: 'Chrome',
			version: parsedBrowserVersion,
		};
	}

	if (parsedUA.browser.name === 'Android Browser') {
		// Versions prior to Blink were based
		// on the OS version. Only after this
		// did android start using system chrome for web-views
		return {
			family: 'Android',
			version: parsedOSVersion,
		};
	}

	return {
		family: parsedUA.browser.name || null,
		version: parsedBrowserVersion,
	};
}

// Without this, we get an empty bundle,
// as this method is tree-shaken out!
export { resolveUserAgent };
