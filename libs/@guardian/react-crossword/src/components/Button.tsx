import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import { memo, useRef, useState } from 'react';

type ButtonProps = SourceButtonProps & {
	onSuccess: () => void;
	requireConfirmation?: boolean;
};

const ButtonComponent = ({
	children,
	requireConfirmation = false,
	onSuccess,
	...props
}: ButtonProps) => {
	const [confirm, setConfirm] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick = () => {
		if (!requireConfirmation) {
			onSuccess();
			return;
		}
		if (!confirm) {
			setConfirm(true);
			timeoutRef.current = setTimeout(() => setConfirm(false), 3000);
			return;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
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

export const Button = memo(ButtonComponent);
