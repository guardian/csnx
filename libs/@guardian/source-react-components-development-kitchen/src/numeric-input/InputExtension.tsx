import type { InputSize } from '@guardian/source-react-components';
import {
	inputExtension,
	inputPrefix,
	inputSuffix,
} from './inputExtensionStyles';
import type { InputTheme } from './NumericInput';
import { errorInput, successInput } from './sharedStyles';

type InputExtensionProps = {
	children: string;
	type: 'prefix' | 'suffix';
	size: InputSize;
	error?: string;
	success?: string;
};

export const InputExtension = ({
	children,
	type,
	size,
	error,
	success,
}: InputExtensionProps) => {
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
