import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import { useState } from 'react';

type ButtonProps = SourceButtonProps & {
	onSuccess: () => void;
	requireConfirmation?: boolean;
};

export const Button = ({
	children,
	requireConfirmation = false,
	onSuccess,
	...props
}: ButtonProps) => {
	const [confirm, setConfirm] = useState<boolean>(false);

	const onClick = () => {
		if (!requireConfirmation) {
			onSuccess();
			return;
		}
		if (!confirm) {
			setConfirm(true);
			setTimeout(() => setConfirm(false), 3000);
			return;
		}
		onSuccess();
		setConfirm(false);
	};

	return (
		<SourceButton onClick={onClick} size="xsmall" {...props}>
			{confirm && 'Confirm '}
			{children}
		</SourceButton>
	);
};
