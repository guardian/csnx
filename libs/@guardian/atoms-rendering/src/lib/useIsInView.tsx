import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

/**
 * Intersection observer hook.
 *
 * @param {Number} threshold intersection threshold
 * @param {Boolean} repeat should the observer retrigger
 * @param {Boolean} debounce
 */

const useIsInView = (
	options: IntersectionObserverInit & {
		debounce?: boolean;
		repeat?: boolean;
	},
): [boolean, React.Dispatch<React.SetStateAction<HTMLElement | null>>] => {
	const [isInView, setIsInView] = useState<boolean>(false);
	const [node, setNode] = useState<HTMLElement | null>(null);

	const observer = useRef<IntersectionObserver | null>(null);

	// Enabling debouncing ensures the target element intersects for at least
	// 200ms before the callback is executed
	const intersectionFn: IntersectionObserverCallback = ([entry]) => {
		if (entry?.isIntersecting) {
			setIsInView(true);
		} else if (options.repeat) {
			setIsInView(false);
		}
	};
	const intersectionCallback = options.debounce
		? libDebounce(intersectionFn, 300)
		: intersectionFn;

	useEffect(() => {
		if (observer.current) {
			observer.current.disconnect();
		}

		if (window.IntersectionObserver) {
			observer.current = new window.IntersectionObserver(
				intersectionCallback,
				options,
			);

			const { current: currentObserver } = observer;

			if (node) {
				currentObserver.observe(node);
			}

			return () => currentObserver.disconnect();
		}

		return;
	}, [node, options, intersectionCallback]);

	return [isInView, setNode];
};

export { useIsInView };
