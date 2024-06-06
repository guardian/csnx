# standardise on a shell
export SHELL := /usr/bin/env bash


################################## DEFAULT TARGET ##############################

# lists available `make` targets
.PHONY: ls
ls:
	@node tools/scripts/list-make-targets.mjs


###################################### DEV #####################################

# runs storybook for all projects in single instance
.PHONY: storybooks
storybooks: env
	$(call log,"Starting storybooks")
	@corepack pnpm --filter=storybooks dev

# runs the dev targets for all projects in single instance
.PHONY: dev
dev: env
	$(call log,"Starting dev tasks")
	@corepack pnpm -r --parallel dev

################################# CODE QUALITY #################################

# runs the unit tests for all projects
.PHONY: test
test: env
	$(call log,"Running unit tests")
	@corepack pnpm -r test

# runs the e2e tests for all projects
.PHONY: e2e
e2e: env
	$(call log,"Running e2e tests")
	@corepack pnpm -r e2e

# runs unit tests against dist for all projects
.PHONY: verify-dist
verify-dist: env
	$(call log,"Running unit tests against dist")
	@corepack pnpm -r verify-dist

# checks all projects for lint errors
.PHONY: lint
lint: install
	$(call log,"Linting projects")
	@corepack pnpm -r lint
	@node ./tools/scripts/check-packages-for-tslib.mjs

# check repo for formatting errors
.PHONY: formatting\:check
formatting\:check: install
	$(call log,"Checking formatting across repo")
	@corepack pnpm prettier --ignore-unknown --cache --check .

# attemps to fix lint errors across all projects
.PHONY: fix
fix: install
	$(call log,"Attempting to fix issues across all projects")
	@corepack pnpm -r fix
	@corepack pnpm prettier --ignore-unknown --cache --write .

# makes sure absolutely everything is working
.PHONY: validate
validate: env lint test e2e build verify-dist build-storybook

##################################### BUILD ####################################

# removes all build artifacts and task caches
.PHONY: clean
clean:
	$(call log,"Clearing all task caches")
	@find . -type d \( -path '*/node_modules*' -prune \) \
		-o \( -type d \( -name 'dist' -o -name '.wireit' \) \
		-exec rm -rf {} + \)

# builds all projects
.PHONY: build
build: env
	$(call log,"Building projects")
	@corepack pnpm -r build

# builds all storybooks
.PHONY: build-storybook
build-storybook: env
	$(call log,"Building storybooks")
	@corepack pnpm run -r build-storybook

############################### MANAGING PACKAGES ##############################

# n.b. publishing is handled in CI using .github/workflows/changesets.yml

# creates a new [changeset](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
.PHONY: changeset
changeset: env
	$(call log,"Creating a new changeset")
	@corepack pnpm changeset

################################ INTERNAL UTILS ################################

# loosely styled logging for user feedback
define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

# Make sure the local env is set up correctly.
.PHONY: env # PRIVATE
env: check-node-version install

# Make sure we're using the correct node version.
.PHONY: check-node-version # PRIVATE
check-node-version:
	$(call log,"Checking Node")
	@./tools/scripts/check-node-version

# Install dependencies. If deps are up to date this is almost instant, so we can
# run before every other target with very little DX cost.
.PHONY: install # PRIVATE
install: check-node-version
	$(call log,"Refreshing dependencies")
	@corepack pnpm install --frozen-lockfile


############################## START PROJECT_TASKS #############################

# This is a set of all possible project-specific tasks.
#
# IT IS AUTOGENERATED BY tools/scripts/maintain-makefile/index.mjs
#
# It enables running the relevant npm-scripts wrapped in the
# standardised Makefile prerequisites.
#
# It also enables us to abstract away things like package manager vendor/version
# etc.

.PHONY: @guardian/ab-core\:build
@guardian/ab-core\:build: env
	@corepack pnpm --filter @guardian/ab-core build

.PHONY: @guardian/ab-core\:dev
@guardian/ab-core\:dev: env
	@corepack pnpm --filter @guardian/ab-core dev

.PHONY: @guardian/ab-core\:fix
@guardian/ab-core\:fix: env
	@corepack pnpm --filter @guardian/ab-core fix

.PHONY: @guardian/ab-core\:lint
@guardian/ab-core\:lint: env
	@corepack pnpm --filter @guardian/ab-core lint

.PHONY: @guardian/ab-core\:test
@guardian/ab-core\:test: env
	@corepack pnpm --filter @guardian/ab-core test

.PHONY: @guardian/ab-core\:verify-dist
@guardian/ab-core\:verify-dist: env
	@corepack pnpm --filter @guardian/ab-core verify-dist

.PHONY: @guardian/ab-react\:build
@guardian/ab-react\:build: env
	@corepack pnpm --filter @guardian/ab-react build

.PHONY: @guardian/ab-react\:dev
@guardian/ab-react\:dev: env
	@corepack pnpm --filter @guardian/ab-react dev

.PHONY: @guardian/ab-react\:fix
@guardian/ab-react\:fix: env
	@corepack pnpm --filter @guardian/ab-react fix

.PHONY: @guardian/ab-react\:lint
@guardian/ab-react\:lint: env
	@corepack pnpm --filter @guardian/ab-react lint

.PHONY: @guardian/ab-react\:test
@guardian/ab-react\:test: env
	@corepack pnpm --filter @guardian/ab-react test

.PHONY: @guardian/ab-react\:verify-dist
@guardian/ab-react\:verify-dist: env
	@corepack pnpm --filter @guardian/ab-react verify-dist

.PHONY: @guardian/browserslist-config\:fix
@guardian/browserslist-config\:fix: env
	@corepack pnpm --filter @guardian/browserslist-config fix

.PHONY: @guardian/browserslist-config\:lint
@guardian/browserslist-config\:lint: env
	@corepack pnpm --filter @guardian/browserslist-config lint

.PHONY: @guardian/browserslist-config\:update-readme
@guardian/browserslist-config\:update-readme: env
	@corepack pnpm --filter @guardian/browserslist-config update-readme

.PHONY: @guardian/cobalt-plugin-ts\:fix
@guardian/cobalt-plugin-ts\:fix: env
	@corepack pnpm --filter @guardian/cobalt-plugin-ts fix

.PHONY: @guardian/cobalt-plugin-ts\:lint
@guardian/cobalt-plugin-ts\:lint: env
	@corepack pnpm --filter @guardian/cobalt-plugin-ts lint

.PHONY: @guardian/core-web-vitals\:build
@guardian/core-web-vitals\:build: env
	@corepack pnpm --filter @guardian/core-web-vitals build

.PHONY: @guardian/core-web-vitals\:dev
@guardian/core-web-vitals\:dev: env
	@corepack pnpm --filter @guardian/core-web-vitals dev

.PHONY: @guardian/core-web-vitals\:fix
@guardian/core-web-vitals\:fix: env
	@corepack pnpm --filter @guardian/core-web-vitals fix

.PHONY: @guardian/core-web-vitals\:lint
@guardian/core-web-vitals\:lint: env
	@corepack pnpm --filter @guardian/core-web-vitals lint

.PHONY: @guardian/core-web-vitals\:test
@guardian/core-web-vitals\:test: env
	@corepack pnpm --filter @guardian/core-web-vitals test

.PHONY: @guardian/core-web-vitals\:verify-dist
@guardian/core-web-vitals\:verify-dist: env
	@corepack pnpm --filter @guardian/core-web-vitals verify-dist

.PHONY: @guardian/design-tokens\:build
@guardian/design-tokens\:build: env
	@corepack pnpm --filter @guardian/design-tokens build

.PHONY: @guardian/design-tokens\:fix
@guardian/design-tokens\:fix: env
	@corepack pnpm --filter @guardian/design-tokens fix

.PHONY: @guardian/design-tokens\:lint
@guardian/design-tokens\:lint: env
	@corepack pnpm --filter @guardian/design-tokens lint

.PHONY: @guardian/eslint-config\:fix
@guardian/eslint-config\:fix: env
	@corepack pnpm --filter @guardian/eslint-config fix

.PHONY: @guardian/eslint-config\:lint
@guardian/eslint-config\:lint: env
	@corepack pnpm --filter @guardian/eslint-config lint

.PHONY: @guardian/eslint-config-typescript\:fix
@guardian/eslint-config-typescript\:fix: env
	@corepack pnpm --filter @guardian/eslint-config-typescript fix

.PHONY: @guardian/eslint-config-typescript\:lint
@guardian/eslint-config-typescript\:lint: env
	@corepack pnpm --filter @guardian/eslint-config-typescript lint

.PHONY: @guardian/identity-auth\:build
@guardian/identity-auth\:build: env
	@corepack pnpm --filter @guardian/identity-auth build

.PHONY: @guardian/identity-auth\:dev
@guardian/identity-auth\:dev: env
	@corepack pnpm --filter @guardian/identity-auth dev

.PHONY: @guardian/identity-auth\:fix
@guardian/identity-auth\:fix: env
	@corepack pnpm --filter @guardian/identity-auth fix

.PHONY: @guardian/identity-auth\:lint
@guardian/identity-auth\:lint: env
	@corepack pnpm --filter @guardian/identity-auth lint

.PHONY: @guardian/identity-auth\:test
@guardian/identity-auth\:test: env
	@corepack pnpm --filter @guardian/identity-auth test

.PHONY: @guardian/identity-auth\:verify-dist
@guardian/identity-auth\:verify-dist: env
	@corepack pnpm --filter @guardian/identity-auth verify-dist

.PHONY: @guardian/identity-auth-frontend\:build
@guardian/identity-auth-frontend\:build: env
	@corepack pnpm --filter @guardian/identity-auth-frontend build

.PHONY: @guardian/identity-auth-frontend\:dev
@guardian/identity-auth-frontend\:dev: env
	@corepack pnpm --filter @guardian/identity-auth-frontend dev

.PHONY: @guardian/identity-auth-frontend\:fix
@guardian/identity-auth-frontend\:fix: env
	@corepack pnpm --filter @guardian/identity-auth-frontend fix

.PHONY: @guardian/identity-auth-frontend\:lint
@guardian/identity-auth-frontend\:lint: env
	@corepack pnpm --filter @guardian/identity-auth-frontend lint

.PHONY: @guardian/identity-auth-frontend\:test
@guardian/identity-auth-frontend\:test: env
	@corepack pnpm --filter @guardian/identity-auth-frontend test

.PHONY: @guardian/identity-auth-frontend\:verify-dist
@guardian/identity-auth-frontend\:verify-dist: env
	@corepack pnpm --filter @guardian/identity-auth-frontend verify-dist

.PHONY: @guardian/libs\:build
@guardian/libs\:build: env
	@corepack pnpm --filter @guardian/libs build

.PHONY: @guardian/libs\:dev
@guardian/libs\:dev: env
	@corepack pnpm --filter @guardian/libs dev

.PHONY: @guardian/libs\:e2e
@guardian/libs\:e2e: env
	@corepack pnpm --filter @guardian/libs e2e

.PHONY: @guardian/libs\:e2e\:ui
@guardian/libs\:e2e\:ui: env
	@corepack pnpm --filter @guardian/libs e2e

.PHONY: @guardian/libs\:fix
@guardian/libs\:fix: env
	@corepack pnpm --filter @guardian/libs fix

.PHONY: @guardian/libs\:lint
@guardian/libs\:lint: env
	@corepack pnpm --filter @guardian/libs lint

.PHONY: @guardian/libs\:test
@guardian/libs\:test: env
	@corepack pnpm --filter @guardian/libs test

.PHONY: @guardian/libs\:verify-dist
@guardian/libs\:verify-dist: env
	@corepack pnpm --filter @guardian/libs verify-dist

.PHONY: @guardian/newsletter-types\:build
@guardian/newsletter-types\:build: env
	@corepack pnpm --filter @guardian/newsletter-types build

.PHONY: @guardian/newsletter-types\:dev
@guardian/newsletter-types\:dev: env
	@corepack pnpm --filter @guardian/newsletter-types dev

.PHONY: @guardian/newsletter-types\:fix
@guardian/newsletter-types\:fix: env
	@corepack pnpm --filter @guardian/newsletter-types fix

.PHONY: @guardian/newsletter-types\:lint
@guardian/newsletter-types\:lint: env
	@corepack pnpm --filter @guardian/newsletter-types lint

.PHONY: @guardian/prettier\:fix
@guardian/prettier\:fix: env
	@corepack pnpm --filter @guardian/prettier fix

.PHONY: @guardian/prettier\:lint
@guardian/prettier\:lint: env
	@corepack pnpm --filter @guardian/prettier lint

.PHONY: @guardian/source\:build
@guardian/source\:build: env
	@corepack pnpm --filter @guardian/source build

.PHONY: @guardian/source\:build-storybook
@guardian/source\:build-storybook: env
	@corepack pnpm --filter @guardian/source build-storybook

.PHONY: @guardian/source\:build-type-presets
@guardian/source\:build-type-presets: env
	@corepack pnpm --filter @guardian/source build-type-presets

.PHONY: @guardian/source\:create-icons
@guardian/source\:create-icons: env
	@corepack pnpm --filter @guardian/source create-icons

.PHONY: @guardian/source\:dev
@guardian/source\:dev: env
	@corepack pnpm --filter @guardian/source dev

.PHONY: @guardian/source\:fix
@guardian/source\:fix: env
	@corepack pnpm --filter @guardian/source fix

.PHONY: @guardian/source\:lint
@guardian/source\:lint: env
	@corepack pnpm --filter @guardian/source lint

.PHONY: @guardian/source\:storybook
@guardian/source\:storybook: env
	@corepack pnpm --filter @guardian/source storybook

.PHONY: @guardian/source\:test
@guardian/source\:test: env
	@corepack pnpm --filter @guardian/source test

.PHONY: @guardian/source\:verify-dist
@guardian/source\:verify-dist: env
	@corepack pnpm --filter @guardian/source verify-dist

.PHONY: @guardian/source-development-kitchen\:build
@guardian/source-development-kitchen\:build: env
	@corepack pnpm --filter @guardian/source-development-kitchen build

.PHONY: @guardian/source-development-kitchen\:build-storybook
@guardian/source-development-kitchen\:build-storybook: env
	@corepack pnpm --filter @guardian/source-development-kitchen build-storybook

.PHONY: @guardian/source-development-kitchen\:dev
@guardian/source-development-kitchen\:dev: env
	@corepack pnpm --filter @guardian/source-development-kitchen dev

.PHONY: @guardian/source-development-kitchen\:fix
@guardian/source-development-kitchen\:fix: env
	@corepack pnpm --filter @guardian/source-development-kitchen fix

.PHONY: @guardian/source-development-kitchen\:lint
@guardian/source-development-kitchen\:lint: env
	@corepack pnpm --filter @guardian/source-development-kitchen lint

.PHONY: @guardian/source-development-kitchen\:storybook
@guardian/source-development-kitchen\:storybook: env
	@corepack pnpm --filter @guardian/source-development-kitchen storybook

.PHONY: @guardian/source-development-kitchen\:test
@guardian/source-development-kitchen\:test: env
	@corepack pnpm --filter @guardian/source-development-kitchen test

.PHONY: @guardian/source-development-kitchen\:verify-dist
@guardian/source-development-kitchen\:verify-dist: env
	@corepack pnpm --filter @guardian/source-development-kitchen verify-dist

.PHONY: github-pages\:build
github-pages\:build: env
	@corepack pnpm --filter github-pages build

.PHONY: github-pages\:dev
github-pages\:dev: env
	@corepack pnpm --filter github-pages dev

.PHONY: github-pages\:start
github-pages\:start: env
	@corepack pnpm --filter github-pages start

.PHONY: storybooks\:dev
storybooks\:dev: env
	@corepack pnpm --filter storybooks dev

############################### END PROJECT_TASKS ##############################
