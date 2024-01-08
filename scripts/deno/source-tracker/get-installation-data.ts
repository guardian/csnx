import { octokit, type RestEndpointMethodTypes } from '../octokit.ts';

export const getInstallationData = async (
	installation: RestEndpointMethodTypes['search']['code']['response']['data']['items'][number],
): Promise<
	RestEndpointMethodTypes['repos']['getContent']['response']['data']
> => {
	const key = `${installation.git_url}-data`;

	const stored = localStorage.getItem(key);
	if (stored) return JSON.parse(stored);

	const { data } = await octokit.rest.repos.getContent({
		owner: installation.repository.owner.login,
		repo: installation.repository.name,
		path: installation.path,
	});
	localStorage.setItem(key, JSON.stringify(data));

	return data;
};
