// Provides functions for generating random strings, hashes, and encoding/decoding strings

// Converts a decimal number to a hexadecimal number
export const dec2hex = (dec: number) => {
	const hex = dec.toString(16);
	return '0'.substring(0, 2 - hex.length) + hex;
};

// Returns a random hexadecimal string of a given length
export const getRandomString = (length: number) => {
	const arr = new Uint8Array(Math.ceil(length / 2));
	window.crypto.getRandomValues(arr);
	const str = Array.from(arr, dec2hex).join('');
	return str.slice(0, length);
};

// generates a SHA256 hash of a string
export const generateSha256Hash = async (str: string) => {
	const buffer = new TextEncoder().encode(str);
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = String.fromCharCode.apply(
		null,
		new Uint8Array(hashArray) as unknown as number[],
	);

	return hash;
};

// Returns a code verifier string of length 128, which is the maximum length allowed
// used for Authorization Code Flow for the PKCE challenge
export const generateCodeVerifier = () => getRandomString(128);

// Generates a code challenge string from a code verifier string
// used for Authorization Code Flow for the PKCE challenge
// The code challenge is a base64url encoded SHA256 hash of the code verifier
export const generateCodeChallenge = async (codeVerifier: string) => {
	// generate SHA256 hash from code verifier
	const hash = await generateSha256Hash(codeVerifier);

	// convert hash to base64url string
	const base64url = base64UrlEncode(hash);

	return base64url;
};

// Converts a base64url string to a UTF-8 string
export const base64UrlToString = (base64Url: string): string => {
	// converts a "url/filename safe" base64 string to a "standard" base64 string
	let base64 = base64UrlToBase64(base64Url);
	// add padding if needed
	switch (base64.length % 4) {
		case 0:
			break;
		case 2:
			base64 += '==';
			break;
		case 3:
			base64 += '=';
			break;
		default:
			throw new Error('Not a valid Base64Url');
	}
	// decode base64 string to a UTF-8 string
	const utf8str = window.atob(base64);

	try {
		// decode any URI-encoded UTF-8 characters
		return decodeURIComponent(window.escape(utf8str));
	} catch (e) {
		// if there was an error, just return the UTF-8 string
		return utf8str;
	}
};

// Converts a UTF-8 string to a Uint8Array buffer
export const stringToBuffer = (str: string) => {
	const buffer = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++) {
		buffer[i] = str.charCodeAt(i);
	}
	return buffer;
};

// Converts a base64url string to a "standard" base64 string
export const base64UrlToBase64 = (base64Url: string) =>
	base64Url.replace(/-/g, '+').replace(/_/g, '/');

// Converts a base64url string to a "normal" string
export const base64UrlDecode = (str: string) =>
	window.atob(base64UrlToBase64(str));

// Converts a "normal" string to a base64url string
export const base64UrlEncode = (str: string) =>
	window.btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
