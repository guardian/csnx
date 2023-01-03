import type { ReactElement } from 'react';
import { FileInput } from './FileInput';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components-development-kitchen_fileinput--optional-file-input&globals=backgrounds.value:transparent)
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components-development-kitchen/src/file-input)
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components-development-kitchen)
 *
 * An input for files
 *
 * The following themes are supported: `light`.
 * */

const fileInput = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="May not work on some mobile devices, or files may be too large."
		/>
	);
};
const optionalFileInput = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="Optional files can be changed or removed once uploaded"
			optional={true}
		/>
	);
};

const fileInputWithError = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="May not work on some mobile devices, or files may be too large."
			error="This is an error"
		/>
	);
};

const fileTypeValidation = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="Only supports pdfs"
			validFileTypes={['application/pdf']}
		/>
	);
};

const fileSizeValidation = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="Only supports very very small images"
			maxFileSize={1}
		/>
	);
};

const smallFileInput = (): ReactElement => {
	return (
		<FileInput
			id="file-input"
			label="Upload a file"
			supporting="A file input with an xsmall button"
			size="xsmall"
		/>
	);
};

export default {
	component: fileInput,
	title: 'FileInput',
};

export {
	fileInput,
	optionalFileInput,
	fileInputWithError,
	fileTypeValidation,
	fileSizeValidation,
	smallFileInput,
};
