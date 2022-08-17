export const normaliseBrowserName = (browser) =>
	browser
		.replace('and_chr', 'chrome (android)')
		.replace('and_ff', 'firefox (android)')
		.replace('and_qq', 'qq (android)')
		.replace('and_uc', 'uc (android)')
		.replace('ios_saf', 'safari (mobile)')
		.replace('ie_mob', 'ie (mobile)')
		.replace('bb', 'blackberry')
		.replace('op_mini', 'opera mini')
		.replace('op_mob', 'opera (mobile)');
