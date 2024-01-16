import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	inputExtension,
	inputPrefix,
	inputSuffix,
} from './inputExtensionStyles';
import type { InputTheme } from './NumericInput';
import { errorInput, successInput } from './sharedStyles';
import { Size } from 'libs/@guardian/source-react-components/src/label/types';

type InputExtensionProps = {
	children: string;
	type: 'prefix' | 'suffix';
	size: Size;
	error?: string;
	success?: string;
};

export const InputExtension = ({
	children,
	type,
	size,
	error,
	success,
}: InputExtensionProps): EmotionJSX.Element => {
	const style = type === 'prefix' ? inputPrefix : inputSuffix;

	return (
		<span
			aria-hidden="true"
			css={(theme: InputTheme) => [
				inputExtension(theme.textInput, size),
				error ? errorInput(theme.textInput) : '',
				!error && success ? successInput(theme.textInput) : '',
				style,
			]}
		>
			{children}
		</span>
	);
};
