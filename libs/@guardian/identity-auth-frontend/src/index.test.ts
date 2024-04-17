import { getIdentityAuth } from './index';

jest.mock('@guardian/identity-auth');

describe('IdentityAuthFrontend', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return access and id token default claims', () => {
		window.guardian = {
			config: { isDev: true, stage: 'CODE' },
		};

		const auth = getIdentityAuth();
		const auth2 = getIdentityAuth();

		expect(auth).toStrictEqual(auth2);
	});
});
