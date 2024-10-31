import * as React from 'react';

interface Breakpoint {
	name: string;
	max: number;
}

const breakpoints: Breakpoint[] = [
	{ name: 'xs', max: 576 },
	{ name: 'sm', max: 768 },
	{ name: 'md', max: 992 },
	{ name: 'lg', max: 1200 },
	{ name: 'xl', max: 1400 },
	{ name: 'xxl', max: 99999 },
];

export default function useBreakpoint() {
	const [breakpoint, setBreakPoint] = React.useState<string>();
	const [windowWidth, setWindowWidth] = React.useState<number>();

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	React.useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		if (windowWidth !== undefined) {
			// set the breakpoint to the first match (smallest first)
			const matches = breakpoints.filter((bp) => windowWidth < bp.max);
			if (matches.length > 0) {
				setBreakPoint(matches[0]?.name);
			} else {
				setBreakPoint(undefined);
			}
		}

		return function cleanup() {
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);
	return breakpoint;
}
