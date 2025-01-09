const sectionExclusionList = ['info', 'help'];

export const isExcludedFromCMP = (pageSection: string): boolean => {
	console.log('pageSection', pageSection);
	return sectionExclusionList.some((section) => section === pageSection);
};
