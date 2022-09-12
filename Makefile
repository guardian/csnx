# standardise on a shell
export SHELL := /usr/bin/env bash

###################################### DEV #####################################

# start the `say-hello` test app
.PHONY: say-hello
say-hello: env
	$(call log,"Running tests")
	@corepack pnpm nx run say-hello:serve

################################# CODE QUALITY #################################

# runs the tests for all projects
.PHONY: test
test: env
	$(call log,"Running tests")
	@corepack pnpm nx run-many --target=test --all=true

# checks all projects for lint errors
.PHONY: lint
lint: install
	$(call log,"Linting projects")
	@corepack pnpm nx run-many --target=lint --all=true

# attemps to fix lint errors across all projects
.PHONY: fix
fix: install
	$(call log,"Attempting to fix lint error in projects")
	@corepack pnpm nx run-many --target=fix --all=true

# makes sure absolutely everything is working
.PHONY: validate
validate: env clean workspace-lint lint test build

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
	@corepack pnpm nx run-many --target=build --all=true

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

# Make sure everything in Nx land is ok
.PHONY: workspace-lint
workspace-lint: install
	$(call log,"Linting workspace")
	@corepack pnpm nx workspace-lint
