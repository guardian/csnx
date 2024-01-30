/**
 * List of permitted use-cases for cookies/storage:
 *
 * - `Targeted advertising`: if the user can be targeted for personalised advertising according to the active consent framework
 * - 'Targeted marketing': if the user can be targeted for personalised marketing, e.g. article count
 * - `Essential`: if essential cookies/storage can be used according to the active consent framework
 * - `No Consent Required`: does not do any consent checks. This is almost certainly not the right choice. Please speak to T&C before using it.
 *
 */
export const ConsentUseCaseOptions = [
	"Targeted advertising",
	"Targeted marketing",
	"Essential",
	"No consent required"
] as const;
export type ConsentUseCases = typeof ConsentUseCaseOptions[number];
