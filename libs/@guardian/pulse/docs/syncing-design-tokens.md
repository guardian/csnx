# Syncing design tokens

Tokens Studio is the source of truth for Pulse's design tokens and where _all_ token updates are made. The tokens in the [`/src/tokens`](https://github.com/guardian/csnx/tree/main/libs/%40guardian/pulse/src/tokens) folder have been exported from Tokens Studio and _should not_ be modified manually. Fetching tokens from Tokens Studio is done via the **Sync Design Tokens** action.

## Running the 'Sync Design Tokens' action

_Note:_ Running this action is not currently automatic due to requiring a [Personal Access Token (PAT) to trigger it from Tokens Studio](https://documentation-v2.tokens.studio/integrations/github-actions.html#step-5-configure-studio-%E2%80%94-ci-trigger-outbound) so must be run manually as required.

The action can be manually invoked from the [repo's **Actions** tab](https://github.com/guardian/csnx/actions/workflows/sync-design-tokens.yml).

By default the action will pull the latest set of tokens from Tokens Studio's `main` branch, but you can also specify a different branch name in order to test changes before they have been merged. The action will create a new Git branch with a timestamped name (eg. `tokens/update-1789140536`) and open a PR for review.
