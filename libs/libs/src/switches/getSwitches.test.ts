import fetchMock from 'jest-fetch-mock';
import type { Switches } from './@types/Switches';
import { __resetCachedValue, getSwitches } from './getSwitches';

fetchMock.enableMocks();

const fixture: Switches = {
	switchA: true,
	switchB: false,
};

describe('getSwitches', () => {
	beforeEach(() => {
		__resetCachedValue();
		delete window.guardian;
	});

	it('gets switches from window.guardian.config', async () => {
		window.guardian = { config: { switches: fixture } };
		const switches = await getSwitches();
		expect(switches).toMatchObject(fixture);
	});

	it('fetches the remote config if local is missing', async () => {
		fetchMock.mockResponseOnce(JSON.stringify(fixture));
		const switches = await getSwitches();
		expect(switches).toMatchObject(fixture);
	});

	it('returns an empty object if there are no switches in the system', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({}));
		const switches = await getSwitches();
		expect(switches).toMatchObject({});
	});

	it('rejects if the switch config is malformed', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				switches: { badSwitch: 'this is not a boolean' },
			}),
		);
		await expect(getSwitches()).rejects.toThrow();
	});

	it('rejects if the fetch response is malformed', async () => {
		fetchMock.mockResponseOnce('rewgrewgwegew');
		await expect(getSwitches()).rejects.toThrow('invalid json');
	});

	it('rejects if the fetch fails', async () => {
		fetchMock.mockRejectOnce();
		await expect(getSwitches()).rejects.toBeUndefined();
	});
});
