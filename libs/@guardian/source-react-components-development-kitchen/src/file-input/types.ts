import type { SerializedStyles } from '@emotion/react';

export type Size = 'default' | 'small' | 'xsmall';

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
	 * An error handler which will be called if uploading the file throws an error.
	 */
	onError?: (e: Error) => void;
	/**
	 * Appears as an inline success message.
	 * This prop should not have a value set at the same time as the error prop. In the event that both are set, errors take precedence.
	 */
	success?: string;
	/**
	 * Callback to call when a file is uploaded. It is passed the base64 stringified file.
	 */
	onUpload?: (file: string | undefined) => void;
	/**
	 * A list of valid file types. Defaults to ["image/png", "image/jpeg", "image/jpg"].
	 */
	validFileTypes?: string[];
	/**
	 * The maximum size of a file that should be uploaded (in bytes)
	 */
	maxFileSize?: number;
	/**
	 * Override component styles by passing in the result of [emotion's `css` function/prop](https://emotion.sh/docs/introduction).
	 */
	cssOverrides?: SerializedStyles | SerializedStyles[];
	/**
	 * Reflects the prominence of the action
	 */
	size?: Size;
}
