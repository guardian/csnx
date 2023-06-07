import { subtle } from 'crypto';
import { TextEncoder } from 'util';
import {
	base64UrlDecode,
	base64UrlEncode,
	base64UrlToBase64,
	base64UrlToString,
	dec2hex,
	generateCodeChallenge,
	generateCodeVerifier,
	generateSha256Hash,
	getRandomString,
	stringToBuffer,
} from '../crypto';

describe('IdentityAuth#crypto#dec2hex', () => {
	it('should convert a decimal number to a hex string', () => {
		expect(dec2hex(10)).toBe('0a');
		expect(dec2hex(255)).toBe('ff');
		expect(dec2hex(256)).toBe('100');
	});
});

describe('IdentityAuth#crypto#getRandomString', () => {
	it('should return a random hex string of the specified length', () => {
		const randomString = getRandomString(10);
		expect(randomString).toHaveLength(10);
		expect(randomString).toMatch(/[0-9a-f]+/);

		const randomString2 = getRandomString(20);
		expect(randomString2).toHaveLength(20);
		expect(randomString2).toMatch(/[0-9a-f]+/);

		expect(randomString).not.toBe(randomString2);
	});
});

describe('IdentityAuth#crypto#generateCodeVerifier', () => {
	it('should return a random string of length 128', () => {
		const codeVerifier = generateCodeVerifier();
		expect(codeVerifier).toHaveLength(128);
		expect(codeVerifier).toMatch(/[0-9a-f]+/);
	});
});

describe('IdentityAuth#crypto#generateCodeChallenge', () => {
	beforeAll(() => {
		// this fixes a `ReferenceError: TextEncoder is not defined` error in a jsdom environment
		global.TextEncoder = TextEncoder;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- this fixes `TypeError: Cannot read properties of undefined (reading 'digest')` error in a jsdom environment
		// @ts-expect-error
		global.crypto.subtle = subtle;
	});

	it('should return a base64url encoded SHA256 hash of the code verifier', async () => {
		const codeVerifier =
			'01234567890abcdef01234567890abcdef01234567890abcdef01234567890abcdef01234567890abcdef01234567890abcdef01234567890abcdef012345678';
		const codeChallenge = await generateCodeChallenge(codeVerifier);

		expect(codeChallenge).toBe('EA0R4gQXsTHVG-2dVzgBbJqmeizB8j76NBvak3qc3-c');
	});
});

describe('IdentityAuth#crypto#base64UrlToBase64', () => {
	it('should convert a base64url string to a base64 string', () => {
		const base64Url = 'aOlsbG8gd_hybGT4-A';
		const base64 = base64UrlToBase64(base64Url);

		expect(base64).toBe('aOlsbG8gd/hybGT4+A');
	});
});

describe('IdentityAuth#crypto#base64UrlDecode', () => {
	it('should convert a base64url string to a JS string', () => {
		const base64Url = 'aOlsbG8gd_hybGT4-A';
		const base64 = base64UrlDecode(base64Url);
		expect(base64).toBe('héllo wørldøø');
	});
});

describe('IdentityAuth#crypto#base64UrlToString', () => {
	it('should convert a base64url string to a UTF-8 string', () => {
		const base64Url = 'aOlsbG8gd_hybGT4-A';
		const base64 = base64UrlToString(base64Url);
		expect(base64).toBe('héllo wørldøø');
	});
});

describe('IdentityAuth#crypto#stringToBuffer', () => {
	it('should convert a string to a Uint8Array', () => {
		const str = 'héllo wørldøø';
		const buffer = stringToBuffer(str);
		expect(buffer).toBeInstanceOf(Uint8Array);
		expect(buffer).toHaveLength(13);
		expect(buffer).toEqual(
			new Uint8Array([
				104, 233, 108, 108, 111, 32, 119, 248, 114, 108, 100, 248, 248,
			]),
		);
	});
});

describe('IdentityAuth#generateSha256Hash', () => {
	it('should return a sha256 hash of the input string', async () => {
		const sha256Hash = await generateSha256Hash('hello world');
		expect(base64UrlEncode(sha256Hash)).toBe(
			'uU0nuZNNPgilLlLX2n2r-sSE7-N6U4DukIj3rOLvzek',
		);
	});
});

describe('IdentityAuth#crypto#base64UrlEncode', () => {
	it('should convert a string to a base64url string', () => {
		const str = 'héllo wørldøø';
		const base64Url = base64UrlEncode(str);
		expect(base64Url).toBe('aOlsbG8gd_hybGT4-A');
	});
});
