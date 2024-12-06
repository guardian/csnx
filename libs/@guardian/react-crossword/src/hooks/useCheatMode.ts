import { useCallback, useEffect, useState } from 'react';

const konamiCode = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
];

export const useCheatMode = () => {
	const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
	const [cheatMode, setCheatMode] = useState(false);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (cheatMode) {
				return;
			}

			if (konamiCode[konamiProgress.length] === event.key) {
				setKonamiProgress([...konamiProgress, event.key]);
			} else {
				setKonamiProgress([]);
			}
		},
		[cheatMode, konamiProgress],
	);

	useEffect(() => {
		if (konamiProgress.length === konamiCode.length) {
			document.removeEventListener('keydown', onKeyDown);
			setCheatMode(true);
		}
	}, [konamiProgress.length, onKeyDown]);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [onKeyDown]);

	return cheatMode;
};
