import { octokit, type RestEndpointMethodTypes } from '../octokit.ts';

export const getInstallations = async (
	packageName: string,
): Promise<
	RestEndpointMethodTypes['search']['code']['response']['data']['items']
> => {
	const key = `${packageName}-result`;

	const stored = localStorage.getItem(key);
	if (stored) return JSON.parse(stored);

	const {
		data: { items },
	} = await octokit.rest.search.code({
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
		q: `filename:package.json+org:guardian+"${packageName}"`,
		per_page: 100,
	});

	localStorage.setItem(key, JSON.stringify(items));

	return items;
};
