# `@guardian/source-*` package usage tracker

This Deno script is used to track the usage of the `@guardian/source-*` packages in the Guardian GitHub organisation.

It keeps https://github.com/guardian/csnx/issues/1058 up to date.

## Development

You can run it locally by running `deno run -A scripts/deno/source-tracker/mod.ts`.

You will need to create a personal access token at https://github.com/settings/tokens/new?scopes=repo and add it to an `.env` file as `GITHUB_TOKEN`.

### Local caching

To avoid hitting the rate limit in dev, the script saves the responses from the APIs it hits in Deno's `localStorage`.

If you want to clear/disable that, uncomment the `localStorage.clear()` line in `mod.ts`.

## Production

The script is run once a day by a GitHub Action. See `.github/workflows/source-tracker.yml`.
