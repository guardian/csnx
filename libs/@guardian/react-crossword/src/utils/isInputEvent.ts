export const isInputEvent = (event: Event): event is InputEvent => {
	return (
		typeof event === 'object' &&
		'inputType' in event &&
		typeof event.inputType === 'string'
	);
};
