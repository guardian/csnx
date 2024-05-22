import type { LabelProps } from './@types/LabelProps';
import { SupportingText } from './SupportingText';
import { Text } from './Text';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_label--default-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/40151e-label/b/86af7d) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/label/Label.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * A label describes a user input field.
 *
 * Label is used by other Source components, such as TextInput. Only use Label
 * if you are building your own form components.
 *
 * The following themes are supported: `light`, `brand`.
 * */
export const Label = ({
	text,
	supporting,
	optional = false,
	hideLabel = false,
	size,
	cssOverrides,
	children,
	theme,
	...props
}: LabelProps) => {
	return (
		<label css={cssOverrides} {...props}>
			<Text
				hideLabel={hideLabel}
				text={text}
				optional={optional}
				size={size}
				theme={theme}
			/>
			{supporting ? (
				<SupportingText hideLabel={hideLabel} theme={theme}>
					{supporting}
				</SupportingText>
			) : (
				''
			)}
			{children}
		</label>
	);
};
