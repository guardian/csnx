import type { LegendProps } from './@types/LegendProps';
import { legend } from './styles';
import { SupportingText } from './SupportingText';
import { Text } from './Text';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_legend--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/40151e-label/b/86af7d) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/label/Legend.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * A legend describes a group of fields, such as a checkbox group or radio group.
 *
 * Legend is used by other Source components, such as RadioGroup. Only use Legend
 * if you are building your own form components.
 *
 * The following themes are supported: `light`, `brand`.
 * */
export const Legend = ({
	text,
	supporting,
	optional = false,
	hideLabel = false,
	cssOverrides,
	theme,
	...props
}: LegendProps) => {
	return (
		<>
			<legend css={[legend, cssOverrides]} {...props}>
				<Text
					text={text}
					optional={optional}
					hideLabel={hideLabel}
					theme={theme}
				/>
			</legend>
			{supporting ? (
				<SupportingText hideLabel={hideLabel} theme={theme}>
					{supporting}
				</SupportingText>
			) : (
				''
			)}
		</>
	);
};
