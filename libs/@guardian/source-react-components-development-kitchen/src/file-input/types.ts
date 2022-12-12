export interface FileInputProps {
	id?: string;
	/**
	 * Appears above the text input
	 */
	label: string;
	/**
	 * Adds the word "Optional" after the label. Non-optional fields are rendered with the `required` attribute.
	 */
	optional?: boolean;
	/**
	 * Visually hides the label and the "Optional" text set by the `optional` flag.
	 */
	hideLabel?: boolean;
	/**
	 * Additional text that appears below the label
	 */
	supporting?: string;
	/**
	 * Appears as an inline error message.
	 */
	error?: string;
	/**
	 * An error handler which will be called if handling the file throws an error.
	 */
	onError?: (e: any) => void;
	/**
	 * Appears as an inline success message.
	 * This prop should not have a value set at the same time as the error prop. In the event that both are set, errors take precedence.
	 */
	success?: string;
	/**
	 * Callback to call when a file is uploaded. It is passed the base64 stringified file.
	 */
	onUpload?: (file: string | undefined) => void;
}
