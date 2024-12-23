const sectionExclusionList = ['info', 'help', 'community', 'identity'];

export const isExcludedFromCMP = (pageSection: string): boolean => {
	console.log('pageSection', pageSection);
	return sectionExclusionList.some((section) => section === pageSection);
};
