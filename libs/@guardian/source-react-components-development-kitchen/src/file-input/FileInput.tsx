import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source-foundations';
import { InlineError, Label } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { getReadableFileSize, stringifyFileBase64 } from './fileHelpers';
import {
	customUpload,
	fileName as fileNameStyle,
	fontSizes,
	uploadSizes,
	warningText,
} from './styles';
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
	cssOverrides,
	validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'],
	maxFileSize,
	size = 'default',
	...props
}) => {
	const [fileName, setFileName] = useState<null | string>();
	const [uploadError, setUploadError] = useState<undefined | string>();

	const errorText = error ?? uploadError;

	const onSelectFile = async (
		event: React.ChangeEvent<HTMLInputElement>,
	): Promise<void> => {
		setUploadError(undefined);
		const file = event.target.files?.[0];
		if (!file) return;

		if (!validFileTypes.includes(file.type)) {
			const typeErrorMessage = `Sorry there was a problem with the file you uploaded. We accept ${validFileTypes.join(
				', ',
			)}`;
			setUploadError(typeErrorMessage);
			return;
		}

		if (maxFileSize && file.size > maxFileSize) {
			const sizeErrorMessage = `Sorry there was a problem with the file you uploaded. The max file size is ${getReadableFileSize(
				maxFileSize,
			)}`;
			setUploadError(sizeErrorMessage);
			return;
		}

		setFileName(file.name);
		try {
			const stringifiedFile = await stringifyFileBase64(file);
			onUpload?.(stringifiedFile);
		} catch (e) {
			const error =
				e instanceof Error
					? e
					: new Error('There was a problem uploading the file');
			onError?.(error);
		}
	};

	const onRemoveFile = (): void => {
		setFileName(undefined);
		onUpload?.(undefined);
	};

	return (
		<div css={[cssOverrides, fontSizes[size]]}>
			<Label
				id={id}
				key={id}
				text={label}
				supporting={supporting}
				optional={optional}
				hideLabel={hideLabel}
				cssOverrides={fontSizes[size]}
			>
				{maxFileSize && (
					<p css={(theme: Theme) => warningText(theme.fileInput)}>
						Please note, the maximum file size is{' '}
						{getReadableFileSize(maxFileSize)}.
					</p>
				)}

				{!!errorText && <InlineError>{errorText}</InlineError>}
				<div
					css={[
						(theme: Theme) => customUpload(theme.fileInput, !!errorText),
						uploadSizes[size],
					]}
				>
					{fileName ? 'Change file' : 'Choose file'}
					<input
						type="file"
						accept={validFileTypes.join(',')}
						css={css`
							${visuallyHidden}
						`}
						onChange={(e) => void onSelectFile(e)}
						required={!optional}
						{...props}
					/>
				</div>
			</Label>

			{fileName && (
				<>
					{optional && (
						<button
							css={[
								(theme: Theme) => customUpload(theme.fileInput),
								fontSizes[size],
								uploadSizes[size],
							]}
							onClick={onRemoveFile}
						>
							Remove file
						</button>
					)}
					<span css={(theme: Theme) => fileNameStyle(theme.fileInput)}>
						{fileName}
					</span>
				</>
			)}
		</div>
	);
};
