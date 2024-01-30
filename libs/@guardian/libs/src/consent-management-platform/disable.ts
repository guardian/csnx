const COOKIE_NAME = 'gu-cmp-disabled';

export const disable = (): void => {
	document.cookie = `${COOKIE_NAME}=true`;
};

export const enable = (): void => {
	document.cookie = `${COOKIE_NAME}=false`;
};

export const isDisabled = (): boolean =>
	new RegExp(`${COOKIE_NAME}=true(\\W+|$)`).test(document.cookie);
