import { SerializedStyles, css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { textInputThemeDefault } from '@guardian/source-react-components';
import { inputBase } from './sharedStyles';

export const inputExtension: (
	input: typeof textInputThemeDefault.textInput,
) => SerializedStyles = (input = textInputThemeDefault.textInput) => css`
	${inputBase(input)}
	display: inline-flex;
	align-items: center;
`;

export const inputPrefix: SerializedStyles = css`
	padding-right: ${space[1]}px;
	border-right: none;
	border-radius: 4px 0px 0px 4px;
`;

export const inputSuffix: SerializedStyles = css`
	padding-left: ${space[1]}px;
	border-left: none;
	border-radius: 0px 4px 4px 0px;
`;
