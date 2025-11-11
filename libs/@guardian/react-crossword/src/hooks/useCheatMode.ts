import { css } from '@emotion/react';
import type { RefObject } from 'react';
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

const cheatStyles = css`
	@keyframes violent-shake {
		0% {
			transform: translate(0, 0) rotate(0deg);
		}
		10% {
			transform: translate(-5px, -5px) rotate(-2deg);
		}
		20% {
			transform: translate(5px, -5px) rotate(2deg);
		}
		30% {
			transform: translate(-5px, 5px) rotate(-2deg);
		}
		40% {
			transform: translate(5px, 5px) rotate(2deg);
		}
		50% {
			transform: translate(-5px, -5px) rotate(-2deg);
		}
		60% {
			transform: translate(5px, -5px) rotate(2deg);
		}
		70% {
			transform: translate(-5px, 5px) rotate(-2deg);
		}
		80% {
			transform: translate(5px, 5px) rotate(2deg);
		}
		90% {
			transform: translate(-5px, -5px) rotate(-2deg);
		}
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
	}

	&.cheat-mode {
		animation: violent-shake 0.15s ease-out;
	}
`;

export const useCheatMode = (ref: RefObject<SVGSVGElement>) => {
	const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
	const [cheatMode, setCheatMode] = useState(false);

	const handleKeyDown = useCallback(
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
			document.removeEventListener('keydown', handleKeyDown);
			// eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: investigate how to fix this
			setCheatMode(true);
			ref.current?.classList.add('cheat-mode');
		}
	}, [konamiProgress.length, handleKeyDown, ref]);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return [cheatMode, cheatStyles];
};
