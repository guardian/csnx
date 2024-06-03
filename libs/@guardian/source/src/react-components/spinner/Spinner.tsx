import { iconSize } from '../../foundations';
import type { IconSize } from '../@types/Icons';
import type { ThemeSpinner } from './theme';
import { themeSpinner } from './theme';

export interface SpinnerProps {
	/**
	 * Size of the spinner
	 */
	size?: IconSize | number;
	/**
	 * Partial or complete theme to override the spinner's default colour palette.
	 * The colours which can be changed are:
	 *
	 * `fillBackground`<br>
	 * `strokeBackground`<br>
	 * `fillForeground`<br>
	 * `strokeForeground`<br>
	 */
	theme?: Partial<ThemeSpinner>;
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-spinner--docs) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/spinner/Spinner.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * A spinner conveys to the user that a process is ongoing. ie. a page is
 * loading or an action is being processed. The spinner is purely visual and
 * does not include any accessibility features. It is the responsibility of the
 * consumer to ensure that the spinner is used in a way that is accessible by
 * adding an appropriate label (either visually or via `aria-label`) and
 * applying `aria-live` to the containing element if the user needs to be
 * informed of changes to the spinner's state.
 */
export const Spinner = ({ size = 'medium', theme }: SpinnerProps) => {
	const mergedTheme = { ...themeSpinner, ...theme };
	const spinnerWidth = typeof size === 'number' ? size : iconSize[size];

	return (
		<svg
			width={spinnerWidth}
			viewBox="0 0 30 30"
			focusable={false}
			aria-hidden={true}
		>
			<g>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					from="0 15 15"
					to="360 15 15"
					dur="2.5s"
					repeatCount="indefinite"
				/>
				<circle
					cx={15}
					cy={15}
					r={12.5}
					strokeWidth={5}
					stroke={mergedTheme.strokeBackground}
					fill={mergedTheme.fillBackground}
				/>
				<circle
					cx={15}
					cy={15}
					r={12.5}
					strokeWidth={5}
					strokeDasharray={82}
					strokeDashoffset={82}
					stroke={mergedTheme.strokeForeground}
					fill={mergedTheme.fillForeground}
				>
					<animate
						attributeName="stroke-dashoffset"
						dur="3.5s"
						from={
							164
						} /* Multiple of `stroke-dasharray` so animation is continuous */
						to={0}
						repeatCount="indefinite"
					/>
				</circle>
			</g>
		</svg>
	);
};
