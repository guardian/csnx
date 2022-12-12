import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source-foundations';
import { InlineError, Label } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { stringifyFileBase64 } from './stringifyFileBase64';
import { customUpload } from './styles';
import type { Theme } from './theme';
import type { FileInputProps } from './types';

export type { FileInputProps } from './types';

export const FileInput: FC<FileInputProps> = ({
	id,
	label,
	optional,
	hideLabel,
	supporting,
	error,
	onError,
	onUpload,
	...props
}) => {
	const [chosenFile, setChosenFile] = useState<null | string>();
	console.log('*** chosenFile', chosenFile);

	const getFileName = (filepath?: string): string =>
		filepath?.split(/(\\|\/)/g).pop() ?? '';

	const onSelectFile = async (
		event: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		console.log('*** hi');
		setChosenFile(event.target.value);
		if (event.target.files?.[0]) {
			try {
				const stringifiedFile = await stringifyFileBase64(
					event.target.files[0],
				);
				onUpload?.(stringifiedFile);
			} catch (e) {
				onError?.(e);
			}
		}
	};

	const onRemoveFile = (): void => {
		setChosenFile(undefined);
		onUpload?.(undefined);
	};

	return (
		<>
			<Label
				id={id}
				key={id}
				text={label}
				supporting={supporting}
				optional={optional}
				hideLabel={hideLabel}
			>
				{error && <InlineError>{error}</InlineError>}
				{/* TODO: Error styling on button? */}
				<div css={(theme: Theme) => customUpload(theme.fileInput)}>
					{chosenFile ? 'Change File' : 'Choose File'}
					<input
						type="file"
						accept="image/*, .pdf"
						css={css`
							${visuallyHidden}
						`}
						onChange={(e) => void onSelectFile(e)}
						required={!optional}
						{...props}
					/>
				</div>
			</Label>
			{chosenFile && (
				<>
					{optional && (
						<button
							css={(theme: Theme) => customUpload(theme.fileInput)}
							onClick={onRemoveFile}
						>
							Remove File
						</button>
					)}
					<span>{getFileName(chosenFile)}</span>
				</>
			)}
		</>
	);
};
