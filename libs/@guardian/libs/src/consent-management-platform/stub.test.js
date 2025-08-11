import {
	loadAllStubs,
	loadStubsFor,
	loadStubsForGeolocationTest,
} from './stub.ts';

describe('stub', () => {
	describe('loadStubsFor', () => {
		beforeEach(() => {
			// Clear the window object before each test
			window.__tcfapi = undefined;
			window.__uspapi = undefined;
			window.__gpp = undefined;
		});

		it('should load the correct stub for the tcfv2', () => {
			loadStubsFor('tcfv2');
			expect(window.__tcfapi).toBeDefined();
			expect(window.__gpp).toBeUndefined();
			expect(window.__uspapi).toBeUndefined();
		});

		it('should load the correct stub for the aus', () => {
			loadStubsFor('aus');
			expect(window.__uspapi).toBeDefined();
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
		});

		it('should load the correct stub for the usnat', () => {
			loadStubsFor('usnat');
			expect(window.__gpp).toBeDefined();
			expect(window.__uspapi).toBeUndefined();
			expect(window.__tcfapi).toBeUndefined();
		});
	});

	describe('loadAllStubs', () => {
		beforeEach(() => {
			// Clear the window object before each test
			window.__tcfapi = undefined;
			window.__uspapi = undefined;
			window.__gpp = undefined;
		});

		it('should load the correct stub for the tcfv2', () => {
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
			expect(window.__uspapi).toBeUndefined();
			loadAllStubs();
			expect(window.__gpp).toBeDefined();
			expect(window.__uspapi).toBeDefined();
		});
	});

	describe('loadStubsForGeolocationTest', () => {
		beforeEach(() => {
			// Clear the window object before each test
			window.__tcfapi = undefined;
			window.__uspapi = undefined;
			window.__gpp = undefined;
		});

		it('should load the correct stub for the tcfv2', () => {
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
			expect(window.__uspapi).toBeUndefined();
			loadStubsForGeolocationTest('tcfv2');
			expect(window.__gpp).toBeDefined();
		});

		it('should load the correct stub for the usnat', () => {
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
			expect(window.__uspapi).toBeUndefined();
			loadStubsForGeolocationTest('usnat');
			expect(window.__gpp).toBeDefined();
		});
		it('should load the correct stub for the aus', () => {
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
			expect(window.__uspapi).toBeUndefined();
			loadStubsForGeolocationTest('aus');
			expect(window.__uspapi).toBeDefined();
			expect(window.__tcfapi).toBeUndefined();
			expect(window.__gpp).toBeUndefined();
		});
	});
});
