export const stringifyFileBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				// remove data:*/*;base64, from the start of the base64 string
				const fileAsBase64 = reader.result?.toString().split(';base64,')[1];

				if (fileAsBase64) {
					resolve(fileAsBase64);
				} else {
					reject(
						new Error('Sorry there was a problem with the file you uploaded.'),
					);
				}
			},
			false,
		);
		reader.addEventListener('error', () => {
			reject(
				new Error(
					'Sorry there was a problem with the file you uploaded above.',
				),
			);
		});
		reader.readAsDataURL(file);
	});

export const getReadableFileSize = (bytes: number) => {
	if (bytes < 1024) {
		return `${bytes} bytes`;
	} else if (bytes >= 1024 && bytes < 1048576) {
		return `${(bytes / 1024).toFixed(1)} KB`;
	}
	return `${(bytes / 1048576).toFixed(1)} MB`;
};
