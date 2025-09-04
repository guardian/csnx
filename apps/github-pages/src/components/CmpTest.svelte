<script>
	// this maps to the version in libs/@guardian/libs
	import { cmp, onConsentChange, log, setCookie } from '@guardian/libs';
	import { onMount } from 'svelte';

	let useNonAdvertisedList = window.location.search.includes('NON_ADV');
	let isUserSignedIn = window.location.search.includes('SIGNED_IN');

	// Extract country from URL parameter or default to GB
	let getInitialCountry = () => {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('country') || 'GB';
	};

	let selectedCountry = getInitialCountry();

	window.guardian.logger.subscribeTo('cmp');

	// allow us to listen to changes on window.guCmpHotFix
	window.guCmpHotFix = new Proxy(window.guCmpHotFix, {
		set: function (target, key, value) {
			target[key] = value;
			console.info('%cwindow.guCmpHotFix', 'color: deeppink;', {
				...window.guCmpHotFix,
			});
			return true;
		},
	});

	function logEvent(event) {
		eventsList = [...eventsList, event];
		log('cmp', event);
	}

	let setABTest = () => {
		setCookie({
			name: 'X-GU-Experiment-0perc-E',
			value: 'true',
		})
	}

	let clearPreferences = () => {
		// clear local storage
		// https://documentation.sourcepoint.com/web-implementation/general/cookies-and-local-storage#cmp-local-storage
		localStorage.clear();

		// clear cookies
		// https://documentation.sourcepoint.com/web-implementation/general/cookies-and-local-storage#cmp-cookies
		document.cookie.split(';').forEach((cookie) => {
			document.cookie = cookie
				.replace(/^ +/, '')
				.replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
		});

		setABTest();

		window.location.reload();
	};

	const toggleQueryParams = (param) => {
		let queryParams = new URLSearchParams(window.location.search);
		queryParams.has(param)
			? queryParams.delete(param)
			: queryParams.append(param, '');
		window.location.search = queryParams.toString();
	};

	const setCountryParam = (country) => {
		let queryParams = new URLSearchParams(window.location.search);
		if (country) {
			queryParams.set('country', country);
		} else {
			queryParams.delete('country');
		}
		window.history.replaceState({}, '', `${window.location.pathname}?${queryParams.toString()}`);
		clearPreferences();
	};

	const toggleIsFeatureFlagEnabled = () => {
		isFeatureFlagEnabled = !isFeatureFlagEnabled;
		toggleQueryParams('CMP_COP');
	};

	const toggleIsUserSignedIn = () => {
		isUserSignedIn = !isUserSignedIn;
		toggleQueryParams('SIGNED_IN');
	};

	const toggleUseNonAdvertisedList = () => {
		useNonAdvertisedList = !useNonAdvertisedList;
		toggleQueryParams('NON_ADV');
	};

	$: consentState = {};
	$: eventsList = [];

	cmp.willShowPrivacyMessage().then((willShow) => {
		logEvent({ title: 'cmp.willShowPrivacyMessage', payload: willShow });
	});

	onConsentChange((payload) => {
		logEvent({ title: 'onConsentChange', payload });
		consentState = payload;
	});

	onMount(async () => {
		cmp.init({
			country: selectedCountry,
			isUserSignedIn: isUserSignedIn,
			useNonAdvertisedList: useNonAdvertisedList,
		});
	});
</script>

<main>
	<nav>
		<button on:click={cmp.showPrivacyManager} data-cy="pm"
			>open privacy manager</button
		>
		<button on:click={clearPreferences}>clear preferences</button>
		<button on:click={setABTest}>set ab test</button>

		<label class={selectedCountry == 'GB' ? 'selected' : 'none'}>
			<input
				type="radio"
				value="GB"
				bind:group={selectedCountry}
				on:change={() => setCountryParam('GB')}
			/>
			in GB:<strong>TCFv2 (CorP)</strong>
		</label>
		<label class={selectedCountry == 'FR' ? 'selected' : 'none'}>
			<input
				type="radio"
				value="FR"
				bind:group={selectedCountry}
				on:change={() => setCountryParam('FR')}
			/>
			in EU:<strong>TCFv2 (CorP)</strong>
		</label>
		<label class={selectedCountry == 'CA' ? 'selected' : 'none'}>
			<input
				type="radio"
				value="CA"
				bind:group={selectedCountry}
				on:change={() => setCountryParam('CA')}
			/>
			in RoW:<strong>TCFv2</strong>
		</label>
		<label class={selectedCountry == 'US' ? 'selected' : 'none'}>
			<input
				type="radio"
				value="US"
				bind:group={selectedCountry}
				on:change={() => setCountryParam('US')}
			/>
			in USA:
			<strong>USNAT</strong>
		</label>
		<label class={selectedCountry == 'AU' ? 'selected' : 'none'}>
			<input
				type="radio"
				value="AU"
				bind:group={selectedCountry}
				on:change={() => setCountryParam('AU')}
			/>
			in Australia:
			<strong>CCPA-like</strong>
		</label>
		<label class={useNonAdvertisedList ? 'selected' : 'none'}>
			<input
				type="checkbox"
				on:change={toggleUseNonAdvertisedList}
				checked={useNonAdvertisedList}
			/>
			<strong>useNonAdvertisedList?</strong>
		</label>
		<label class={isUserSignedIn ? 'selected' : 'none'}>
			<input
				type="checkbox"
				on:change={toggleIsUserSignedIn}
				checked={isUserSignedIn}
			/>
			<strong>isUserSignedIn?</strong>
		</label>
	</nav>

	<div id="consent-state">
		{#if consentState.tcfv2}
			<h2>tcfv2.eventStatus</h2>
			<span class="label">{consentState.tcfv2.eventStatus}</span>

			<h2>tcfv2.consents</h2>
			{#each Object.entries(consentState.tcfv2.consents) as [purpose, state]}
				<span
					class={JSON.parse(state) ? 'yes' : 'no'}
					data-purpose={purpose}
					data-consent={state}>{purpose}</span
				>
			{/each}

			<h2>tcfv2.vendorConsents</h2>
			{#each Object.entries(consentState.tcfv2.vendorConsents) as [consent, state]}
				<span class={JSON.parse(state) ? 'yes' : 'no'}>{consent}</span>
			{/each}
		{:else if consentState.usnat}
			<h2>usnat.doNotSell</h2>
			<span class="label" data-donotsell={consentState.usnat.doNotSell}
				>{consentState.usnat.doNotSell}</span
			>
		{:else if consentState.aus}
			<h2>aus.personalisedAdvertising</h2>
			<span
				data-personalised-advertising={consentState.aus.personalisedAdvertising}
				class={consentState.aus.personalisedAdvertising ? 'yes' : 'no'}
				>{consentState.aus.personalisedAdvertising}</span
			>
		{:else}
			<h2>¯\_(ツ)_/¯</h2>
		{/if}
	</div>

	<ol id="events">
		{#each eventsList as { title, payload }}
			<li>
				<details>
					<summary>{title}</summary>
					<pre>{JSON.stringify(payload, null, 4)}</pre>
				</details>
			</li>
		{/each}
	</ol>
</main>

<style>
	* {
		font-family:
			SFMono-Regular,
			Consolas,
			Liberation Mono,
			Menlo,
			monospace;
		font-size: 12px;
	}

	main {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: auto 400px;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'footer sidebar'
			'main sidebar';
	}

	main > * {
		overflow: auto;
	}

	nav {
		grid-area: footer;
		padding: 0.5rem;
		align-self: end;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		z-index: 1;
		display: flex;
	}

	nav * {
		font-family:
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Helvetica,
			Arial,
			sans-serif,
			Apple Color Emoji,
			Segoe UI Emoji;
		margin: 0 0.25em 0;
	}

	nav * + * {
		margin-left: 0.5em;
		max-width: 50%;
	}

	#consent-state {
		grid-area: main;
		padding: 1rem;
	}

	#events {
		grid-area: sidebar;
		list-style-type: none;
		padding: 0;
		border-left: black solid 1px;
		overflow: auto;
		margin: 0;
	}

	#events li {
		border-bottom: 1px solid #eee;
		padding: 0;
	}

	#events pre {
		margin: 0;
		background-color: oldlace;
		color: deeppink;
		padding: 0.4em 0.5em;
	}

	label {
		display: inline-flex;
		align-items: center;
		padding: 0.25em;
		border-radius: 0.25em;
		border: rgba(0, 0, 0, 0.1) solid 1px;
	}

	label.selected {
		background-color: lightgrey;
	}

	summary {
		cursor: pointer;
		padding: 0.2em 0.5em;
	}

	.yes,
	.no,
	.label {
		display: inline-flex;
		min-height: 1.5rem;
		min-width: 1.5rem;
		align-items: center;
		justify-content: center;
		margin-right: 1px;
		margin-bottom: 1px;
		font-weight: normal;
		padding: 0 1ch;
		box-sizing: border-box;
	}

	.yes {
		background-color: chartreuse;
	}

	.no {
		background-color: #ff1a4f;
	}

	.label {
		width: auto;
		font-weight: normal;
		background-color: oldlace;
		color: deeppink;
	}

	h2 {
		font-weight: normal;
		margin: 0 0 0.2rem;
	}

	* + h2 {
		margin-top: 1rem;
	}
</style>
