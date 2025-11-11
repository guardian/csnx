import { useEffect, useRef, useState } from 'react';

const AnimationDurationMilliseconds = 5000;

export const useTicker = (total: number, readyToAnimate: boolean): number => {
	const [runningTotal, setRunningTotal] = useState<number>(0);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		if (!readyToAnimate) {
			// eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: investigate how to fix this
			setRunningTotal(0);
			return;
		}

		const startTime = performance.now();

		const animate = (currentTime: number) => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / AnimationDurationMilliseconds, 1);
			const currentTotal = Math.floor(progress * total);

			setRunningTotal(currentTotal);

			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [total, readyToAnimate]);

	return runningTotal;
};
