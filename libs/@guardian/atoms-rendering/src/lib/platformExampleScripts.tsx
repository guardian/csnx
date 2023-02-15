export const atomResizer = (): void => {
	const iframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll('.atom__iframe'),
	);
	type HeightEvent = { source: { name: string } };

	window.addEventListener('message', (event) => {
		const iframe: HTMLIFrameElement | undefined = iframes.find((i) => {
			try {
				return i.name === (event as HeightEvent).source.name;
			} catch (e) {
				return false;
			}
		});
		if (iframe) {
			try {
				const message = JSON.parse(event.data);
				switch (message.type) {
					case 'set-height':
						iframe.height = message.value;
						break;
					default:
				}
				// eslint-disable-next-line no-empty
			} catch (e) {}
		}
	});
};

export const atomGuScriptSwap = (): void => {
	const iframes: HTMLIFrameElement[] = [].slice.call(
		document.querySelectorAll('.atom__iframe'),
	);

	iframes.forEach((iframe) => {
		const src = (iframe.getAttribute('srcdoc') ?? '')
			.replace(/<gu-script>/g, '<script>')
			.replace(/<\/gu-script>/g, '<' + '/script>');
		iframe.setAttribute('srcdoc', src);
	});
};
