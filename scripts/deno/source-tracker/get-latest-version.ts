import getLatestOnNpm from 'npm:latest-version@7.0.0';

export const getLatestVersion = async (packageName: string) => {
	const key = `${packageName}-latest`;

	const stored = localStorage.getItem(key);
	if (stored) {
		return stored;
	}

	const result = await getLatestOnNpm(packageName);
	localStorage.setItem(key, result);

	return result;
};
