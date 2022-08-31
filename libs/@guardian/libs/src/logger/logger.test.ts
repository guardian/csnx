import { hex } from 'wcag-contrast';
import { storage } from '../storage/storage';
import type { TeamName } from './@types/logger';
import { debug } from './debug';
import { log } from './log';
import { STORAGE_KEY } from './storage-key';
import { teamStyles } from './teamStyles';

const spy = jest
	.spyOn(console, 'log')
	.mockImplementation(() => () => undefined);

const consoleMessage = (): string | undefined => {
	if (spy.mock.calls[0] && typeof spy.mock.calls[0][5] === 'string') {
		return spy.mock.calls[0][5];
	}
	return undefined;
};

describe('Logs messages for a team', () => {
	it(`should not log any messages by default`, () => {
		log('cmp', 'this will not log');
		log('commercial', 'neither will this');
		log('dotcom', 'or this');
		expect(consoleMessage()).toBeUndefined();
	});

	const message = 'Hello, world!';
	const team = 'cmp';

	it(`should be able to add team ${team}`, () => {
		if (window.guardian?.logger) window.guardian.logger.subscribeTo(team);
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe(team);
	});
	it(`should log ${message} for team ${team}`, () => {
		log(team, message);
		expect(consoleMessage()).toBe(message);
	});

	it('should log debug messages in dev', () => {
		debug(team, message);
		expect(consoleMessage()).toBe(message);
	});

	it('should not log debug messages in prod', () => {
		//@ts-expect-error -- we’re modifying the window
		delete window.location;
		//@ts-expect-error -- we only check window.location.origin
		window.location = new URL('https://www.theguardian.com');

		debug(team, message);
		expect(consoleMessage()).toBe(undefined);
	});
});

describe('Add and remove teams', () => {
	it(`should first clear local storage`, () => {
		storage.local.clear();
		expect(storage.local.get(STORAGE_KEY)).toBe(null);
	});
	it(`should be able to add two teams`, () => {
		if (window.guardian?.logger) {
			window.guardian.logger.subscribeTo('commercial');
			window.guardian.logger.subscribeTo('dotcom');
		}
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe('commercial,dotcom');
	});

	it(`should be able to add a third team`, () => {
		if (window.guardian?.logger) window.guardian.logger.subscribeTo('cmp');
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe('commercial,dotcom,cmp');
	});

	it(`should not add teams more than once`, () => {
		if (window.guardian?.logger) {
			window.guardian.logger.subscribeTo('cmp');
			window.guardian.logger.subscribeTo('dotcom');
			window.guardian.logger.subscribeTo('dotcom');
			window.guardian.logger.subscribeTo('commercial');
		}
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe('commercial,dotcom,cmp');
	});

	it(`should be able to remove a third team`, () => {
		if (window.guardian?.logger) {
			window.guardian.logger.unsubscribeFrom('cmp');
		}
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe('commercial,dotcom');
	});

	it(`should be able to remove a team`, () => {
		if (window.guardian?.logger) {
			window.guardian.logger.unsubscribeFrom('commercial');
		}
		const registered: string = storage.local.get(STORAGE_KEY) as string;
		expect(registered).toBe('dotcom');
	});

	it('should return the list of registered teams', () => {
		const teams = window.guardian?.logger?.teams();
		expect(Array.isArray(teams)).toBe(true);
		expect(teams).toContain('cmp');
	});
});

describe('Team-based logging', () => {
	const teams: TeamName[] = ['cmp', 'commercial', 'dotcom'];

	it.each(teams)(`should only log message for team: %s`, (team) => {
		storage.local.set(STORAGE_KEY, team);

		teams.map((t) => {
			log(t, `a message for ${t}`);
		});
		expect(consoleMessage()).toBe(`a message for ${team}`);
	});
});

describe('Ensure labels are accessible', () => {
	it.each(Object.entries(teamStyles))(
		'should have a minimum contrast ratio of 4.5 (AA) for %s',
		(_, colour) => {
			const { font, background } = colour;
			const ratio = hex(font, background);

			expect(ratio).toBeGreaterThanOrEqual(4.5);
		},
	);
});
