const sectionExclusionList = ['info', 'help', 'community', 'identity'];

export const isExcludedFromCMP = (pageSection: string): boolean => {
	return sectionExclusionList.some((section) => section === pageSection);
};
