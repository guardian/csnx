/**
 * @name OAuthError
 * @description Error thrown when an OAuth error occurs
 *
 * @param error - The error object
 * @param error.error - The error string, usually the `error` query param, but can be set to a custom error string
 * @param error.error_description - The error description, usually the `error_description` query param, but can be set to a custom error description string
 * @param error.message - The error message
 * @param error.status - The error status code
 */
export class OAuthError extends Error {
	error: string;
	error_description: string;

	constructor(error: {
		error: string;
		error_description: string;
		message?: string;
		status?: number;
	}) {
		super(error.message);
		this.error = error.error;
		this.error_description = error.error_description;
		this.name = 'OAuthError';
	}
}
