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
	@corepack pnpm nx run-many --target=dev --skip-nx-cache=$(SKIP_NX_CACHE)

################################# CODE QUALITY #################################

# runs the unit tests for all projects
.PHONY: test
test: env
	$(call log,"Running unit tests")
	@corepack pnpm nx run-many --target=test --skip-nx-cache=$(SKIP_NX_CACHE)

# runs the e2e tests for all projects
.PHONY: e2e
e2e: env
	$(call log,"Running e2e tests")
	@corepack pnpm nx run-many --target=e2e --skip-nx-cache=$(SKIP_NX_CACHE)

# runs unit tests against dist for all projects
.PHONY: verify-dist
verify-dist: env
	$(call log,"Running unit tests against dist")
	@corepack pnpm nx run-many --target=verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

# checks all projects for lint errors
.PHONY: lint
lint: install
	$(call log,"Linting projects")
	@corepack pnpm nx run-many --target=lint --skip-nx-cache=$(SKIP_NX_CACHE)
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
	@corepack pnpm nx run-many --target=fix --skip-nx-cache=$(SKIP_NX_CACHE)
	@corepack pnpm prettier --ignore-unknown --cache --write .

# makes sure absolutely everything is working
.PHONY: validate
validate: env clean lint test e2e build verify-dist build\:storybooks

##################################### BUILD ####################################

# removes all build artifacts
.PHONY: clean
clean: env
	$(call log,"Cleaning all build assets")
	@rm -rf dist/**

# builds all projects
.PHONY: build
build: env clean
	$(call log,"Building projects")
	@corepack pnpm nx run-many --target=build --skip-nx-cache=$(SKIP_NX_CACHE)

# builds all storybooks
.PHONY: build\:storybooks
build\:storybooks: env
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
# It enables running the relevant npm-scripts/Nx targets wrapped in the
# standardised Makefile prerequisites.
#
# It also enables us to abstract away things like package manager vendor/version
# etc.

.PHONY: @guardian/ab-core\:build
@guardian/ab-core\:build: env
	@corepack pnpm nx run @guardian/ab-core:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-core\:dev
@guardian/ab-core\:dev: env
	@corepack pnpm nx run @guardian/ab-core:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-core\:fix
@guardian/ab-core\:fix: env
	@corepack pnpm nx run @guardian/ab-core:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-core\:lint
@guardian/ab-core\:lint: env
	@corepack pnpm nx run @guardian/ab-core:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-core\:test
@guardian/ab-core\:test: env
	@corepack pnpm nx run @guardian/ab-core:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-core\:verify-dist
@guardian/ab-core\:verify-dist: env
	@corepack pnpm nx run @guardian/ab-core:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:build
@guardian/ab-react\:build: env
	@corepack pnpm nx run @guardian/ab-react:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:dev
@guardian/ab-react\:dev: env
	@corepack pnpm nx run @guardian/ab-react:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:fix
@guardian/ab-react\:fix: env
	@corepack pnpm nx run @guardian/ab-react:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:lint
@guardian/ab-react\:lint: env
	@corepack pnpm nx run @guardian/ab-react:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:test
@guardian/ab-react\:test: env
	@corepack pnpm nx run @guardian/ab-react:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/ab-react\:verify-dist
@guardian/ab-react\:verify-dist: env
	@corepack pnpm nx run @guardian/ab-react:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/browserslist-config\:fix
@guardian/browserslist-config\:fix: env
	@corepack pnpm nx run @guardian/browserslist-config:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/browserslist-config\:lint
@guardian/browserslist-config\:lint: env
	@corepack pnpm nx run @guardian/browserslist-config:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/browserslist-config\:update-readme
@guardian/browserslist-config\:update-readme: env
	@corepack pnpm nx run @guardian/browserslist-config:update-readme --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/cobalt-plugin-ts\:fix
@guardian/cobalt-plugin-ts\:fix: env
	@corepack pnpm nx run @guardian/cobalt-plugin-ts:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/cobalt-plugin-ts\:lint
@guardian/cobalt-plugin-ts\:lint: env
	@corepack pnpm nx run @guardian/cobalt-plugin-ts:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:build
@guardian/core-web-vitals\:build: env
	@corepack pnpm nx run @guardian/core-web-vitals:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:dev
@guardian/core-web-vitals\:dev: env
	@corepack pnpm nx run @guardian/core-web-vitals:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:fix
@guardian/core-web-vitals\:fix: env
	@corepack pnpm nx run @guardian/core-web-vitals:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:lint
@guardian/core-web-vitals\:lint: env
	@corepack pnpm nx run @guardian/core-web-vitals:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:test
@guardian/core-web-vitals\:test: env
	@corepack pnpm nx run @guardian/core-web-vitals:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/core-web-vitals\:verify-dist
@guardian/core-web-vitals\:verify-dist: env
	@corepack pnpm nx run @guardian/core-web-vitals:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/design-tokens\:build
@guardian/design-tokens\:build: env
	@corepack pnpm nx run @guardian/design-tokens:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/design-tokens\:fix
@guardian/design-tokens\:fix: env
	@corepack pnpm nx run @guardian/design-tokens:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/design-tokens\:lint
@guardian/design-tokens\:lint: env
	@corepack pnpm nx run @guardian/design-tokens:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-config\:fix
@guardian/eslint-config\:fix: env
	@corepack pnpm nx run @guardian/eslint-config:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-config\:lint
@guardian/eslint-config\:lint: env
	@corepack pnpm nx run @guardian/eslint-config:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-config-typescript\:fix
@guardian/eslint-config-typescript\:fix: env
	@corepack pnpm nx run @guardian/eslint-config-typescript:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-config-typescript\:lint
@guardian/eslint-config-typescript\:lint: env
	@corepack pnpm nx run @guardian/eslint-config-typescript:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:build
@guardian/eslint-plugin-source-foundations\:build: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:dev
@guardian/eslint-plugin-source-foundations\:dev: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:fix
@guardian/eslint-plugin-source-foundations\:fix: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:lint
@guardian/eslint-plugin-source-foundations\:lint: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:test
@guardian/eslint-plugin-source-foundations\:test: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-foundations\:verify-dist
@guardian/eslint-plugin-source-foundations\:verify-dist: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-foundations:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:build
@guardian/eslint-plugin-source-react-components\:build: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:dev
@guardian/eslint-plugin-source-react-components\:dev: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:fix
@guardian/eslint-plugin-source-react-components\:fix: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:lint
@guardian/eslint-plugin-source-react-components\:lint: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:test
@guardian/eslint-plugin-source-react-components\:test: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/eslint-plugin-source-react-components\:verify-dist
@guardian/eslint-plugin-source-react-components\:verify-dist: env
	@corepack pnpm nx run @guardian/eslint-plugin-source-react-components:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:build
@guardian/identity-auth\:build: env
	@corepack pnpm nx run @guardian/identity-auth:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:dev
@guardian/identity-auth\:dev: env
	@corepack pnpm nx run @guardian/identity-auth:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:fix
@guardian/identity-auth\:fix: env
	@corepack pnpm nx run @guardian/identity-auth:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:lint
@guardian/identity-auth\:lint: env
	@corepack pnpm nx run @guardian/identity-auth:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:test
@guardian/identity-auth\:test: env
	@corepack pnpm nx run @guardian/identity-auth:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth\:verify-dist
@guardian/identity-auth\:verify-dist: env
	@corepack pnpm nx run @guardian/identity-auth:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:build
@guardian/identity-auth-frontend\:build: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:dev
@guardian/identity-auth-frontend\:dev: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:fix
@guardian/identity-auth-frontend\:fix: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:lint
@guardian/identity-auth-frontend\:lint: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:test
@guardian/identity-auth-frontend\:test: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/identity-auth-frontend\:verify-dist
@guardian/identity-auth-frontend\:verify-dist: env
	@corepack pnpm nx run @guardian/identity-auth-frontend:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:build
@guardian/libs\:build: env
	@corepack pnpm nx run @guardian/libs:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:dev
@guardian/libs\:dev: env
	@corepack pnpm nx run @guardian/libs:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:e2e
@guardian/libs\:e2e: env
	@corepack pnpm nx run @guardian/libs:e2e --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:fix
@guardian/libs\:fix: env
	@corepack pnpm nx run @guardian/libs:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:lint
@guardian/libs\:lint: env
	@corepack pnpm nx run @guardian/libs:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:test
@guardian/libs\:test: env
	@corepack pnpm nx run @guardian/libs:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/libs\:verify-dist
@guardian/libs\:verify-dist: env
	@corepack pnpm nx run @guardian/libs:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/newsletter-types\:build
@guardian/newsletter-types\:build: env
	@corepack pnpm nx run @guardian/newsletter-types:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/newsletter-types\:dev
@guardian/newsletter-types\:dev: env
	@corepack pnpm nx run @guardian/newsletter-types:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/newsletter-types\:fix
@guardian/newsletter-types\:fix: env
	@corepack pnpm nx run @guardian/newsletter-types:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/newsletter-types\:lint
@guardian/newsletter-types\:lint: env
	@corepack pnpm nx run @guardian/newsletter-types:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/prettier\:fix
@guardian/prettier\:fix: env
	@corepack pnpm nx run @guardian/prettier:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/prettier\:lint
@guardian/prettier\:lint: env
	@corepack pnpm nx run @guardian/prettier:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:build
@guardian/source-foundations\:build: env
	@corepack pnpm nx run @guardian/source-foundations:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:build-storybook
@guardian/source-foundations\:build-storybook: env
	@corepack pnpm nx run @guardian/source-foundations:build-storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:build-type-presets
@guardian/source-foundations\:build-type-presets: env
	@corepack pnpm nx run @guardian/source-foundations:build-type-presets --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:dev
@guardian/source-foundations\:dev: env
	@corepack pnpm nx run @guardian/source-foundations:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:fix
@guardian/source-foundations\:fix: env
	@corepack pnpm nx run @guardian/source-foundations:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:lint
@guardian/source-foundations\:lint: env
	@corepack pnpm nx run @guardian/source-foundations:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:storybook
@guardian/source-foundations\:storybook: env
	@corepack pnpm nx run @guardian/source-foundations:storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:test
@guardian/source-foundations\:test: env
	@corepack pnpm nx run @guardian/source-foundations:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-foundations\:verify-dist
@guardian/source-foundations\:verify-dist: env
	@corepack pnpm nx run @guardian/source-foundations:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:build
@guardian/source-react-components\:build: env
	@corepack pnpm nx run @guardian/source-react-components:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:build-storybook
@guardian/source-react-components\:build-storybook: env
	@corepack pnpm nx run @guardian/source-react-components:build-storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:create-icons
@guardian/source-react-components\:create-icons: env
	@corepack pnpm nx run @guardian/source-react-components:create-icons --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:dev
@guardian/source-react-components\:dev: env
	@corepack pnpm nx run @guardian/source-react-components:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:fix
@guardian/source-react-components\:fix: env
	@corepack pnpm nx run @guardian/source-react-components:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:lint
@guardian/source-react-components\:lint: env
	@corepack pnpm nx run @guardian/source-react-components:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:storybook
@guardian/source-react-components\:storybook: env
	@corepack pnpm nx run @guardian/source-react-components:storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:test
@guardian/source-react-components\:test: env
	@corepack pnpm nx run @guardian/source-react-components:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components\:verify-dist
@guardian/source-react-components\:verify-dist: env
	@corepack pnpm nx run @guardian/source-react-components:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:build
@guardian/source-react-components-development-kitchen\:build: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:build-storybook
@guardian/source-react-components-development-kitchen\:build-storybook: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:build-storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:dev
@guardian/source-react-components-development-kitchen\:dev: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:fix
@guardian/source-react-components-development-kitchen\:fix: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:lint
@guardian/source-react-components-development-kitchen\:lint: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:storybook
@guardian/source-react-components-development-kitchen\:storybook: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:storybook --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:test
@guardian/source-react-components-development-kitchen\:test: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:test --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/source-react-components-development-kitchen\:verify-dist
@guardian/source-react-components-development-kitchen\:verify-dist: env
	@corepack pnpm nx run @guardian/source-react-components-development-kitchen:verify-dist --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/tsconfig\:fix
@guardian/tsconfig\:fix: env
	@corepack pnpm nx run @guardian/tsconfig:fix --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: @guardian/tsconfig\:lint
@guardian/tsconfig\:lint: env
	@corepack pnpm nx run @guardian/tsconfig:lint --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: github-pages\:build
github-pages\:build: env
	@corepack pnpm nx run github-pages:build --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: github-pages\:dev
github-pages\:dev: env
	@corepack pnpm nx run github-pages:dev --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: github-pages\:start
github-pages\:start: env
	@corepack pnpm nx run github-pages:start --skip-nx-cache=$(SKIP_NX_CACHE)

.PHONY: storybooks\:dev
storybooks\:dev: env
	@corepack pnpm nx run storybooks:dev --skip-nx-cache=$(SKIP_NX_CACHE)

############################### END PROJECT_TASKS ##############################
