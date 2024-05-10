# `@guardian/source-react-components` scripts

## `create-icons`

Fetches the SVG data for the Source icon set from Figma and generates React components using [SVGR](https://github.com/gregberge/svgr).

The script can be run with:

```sh
pnpm --filter @guardian/source create-icons
```

### Personal access token

In order to run the script you will need a personal access token to authenticate with the Figma API.

1. Log in to your Figma account.
2. Select **Help and account > Account settings** in Figma's main menu.
3. Go to the **Personal access tokens** section under the **Account** tab and add a description to generate a new token.
4. A new token will be generated immediately. _Note:_ this is your **only** chance to copy the token.

The token is passed to the script via an environment variable called `FIGMA_TOKEN`. This can be set on the command line when running the script:

```sh
FIGMA_TOKEN=TOKEN_GOES_HERE pnpm --filter @guardian/source create-icons
```

Or you can create a `.env` file in the root of the `source-react-components` package and set the variable there to avoid having to provide it every time you run the script:

```env
FIGMA_TOKEN=TOKEN_GOES_HERE
```

_Note:_ The script does not run as part of the build process to ensure we don't inadvertently pick up changes to icons as part of an unrelated change.
