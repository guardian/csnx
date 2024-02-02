import type { Theme } from '../@types/Theme';
import type { ThemeAccordion } from './theme';

export const transformAccordionProviderTheme = (
	providerTheme: Theme['accordion'],
): Partial<ThemeAccordion> => {
	const transformedTheme: Partial<ThemeAccordion> = {};

	if (providerTheme?.textPrimary) {
		transformedTheme.label = providerTheme.textPrimary;
	}
	if (providerTheme?.borderPrimary) {
		transformedTheme.border = providerTheme.borderPrimary;
	}

	return transformedTheme;
};
