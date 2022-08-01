import { loadScript } from './loadScript';

const goodURL = 'good-url';
const badURL = 'bad-url';

// mimic script loading events.
// when we detect that a script has been added to the DOM:
// - if the src is goodURL trigger a load event
// - if the src is badURL trigger an error event
new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((addedNode) => {
			if (addedNode.nodeName === 'SCRIPT') {
				const addedScript = addedNode as HTMLScriptElement;

				if (addedScript.src.includes(goodURL)) {
					addedNode.dispatchEvent(new Event('load'));
				}

				if (addedScript.src.includes(badURL)) {
					addedNode.dispatchEvent(new Event('error'));
				}
			}
		});
	});
}).observe(document.body, {
	childList: true,
});

beforeEach(() => {
	document.body.innerHTML = '';
	document.body.appendChild(document.createElement('script'));
});

describe('loadScript', () => {
	it('adds a script to the page and resolves the promise it returns when the script loads', async () => {
		expect(document.scripts).toHaveLength(1);
		await expect(loadScript(goodURL)).resolves.toMatchObject({
			type: 'load',
		});
		expect(document.scripts).toHaveLength(2);
	});

	it('resolves immediately if a script with matching src is already on page and stops there', async () => {
		expect(document.scripts).toHaveLength(1);
		await expect(loadScript(goodURL)).resolves.toMatchObject({
			type: 'load',
		});
		// try injecting it again a random amount of times
		await expect(loadScript(goodURL)).resolves.toBeUndefined();
		await expect(loadScript(goodURL)).resolves.toBeUndefined();
		await expect(loadScript(goodURL)).resolves.toBeUndefined();
		expect(document.scripts).toHaveLength(2);
	});

	it('does not inject duplicate scripts if they are called with and without protocol', async () => {
		expect(document.scripts).toHaveLength(1);
		await expect(loadScript(`//${goodURL}`)).resolves.toMatchObject({
			type: 'load',
		});
		// try injecting it again with a full protocol (http-only because we're in jest)
		await expect(loadScript(`http://${goodURL}`)).resolves.toBeUndefined();
		expect(document.scripts).toHaveLength(2);
	});

	it('can add scripts with attributes', async () => {
		await loadScript(goodURL, {
			async: true,
			referrerPolicy: 'no-referrer',
			className: 'u6ytfiuyoibnpoim',
		});
		expect(document.scripts[0].async).toBeTruthy();
		expect(document.scripts[0].referrerPolicy).toBe('no-referrer');
		expect(document.scripts[0].className).toBe('u6ytfiuyoibnpoim');
	});

	it('rejects if the script fails to load', async () => {
		await expect(loadScript(badURL)).rejects.toBeDefined();
	});
});
