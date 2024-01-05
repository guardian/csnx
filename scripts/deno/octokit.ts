import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';
import { Octokit } from 'https://esm.sh/@octokit/rest@20.0.2';

export { type RestEndpointMethodTypes } from 'https://esm.sh/@octokit/rest@20.0.2';

// this should be provided by the environment (i.e. GitHub Actions)
let token = Deno.env.get('GITHUB_TOKEN');

if (!token) {
	// we're probably running in a local dev environment
	// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
	// and add it to your .env file as GITHUB_TOKEN
	const env = await load();
	token = env.GITHUB_TOKEN;
}
if (!token) console.warn('Missing GITHUB_TOKEN');

export const octokit = new Octokit({
	auth: token,
});
