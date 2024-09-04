declare module 'update-section' {
	function updateSection(
		content: string,
		section: string,
		matchesStart: (line: string) => boolean,
		matchesEnd: (line: string) => boolean,
		top?: boolean,
	): string;

	export default updateSection;
}
