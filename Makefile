# standardise on a shell
export SHELL := /usr/bin/env bash

################################# CODE QUALITY #################################

# runs the test for all projects
.PHONY: test
test: env
	$(call log,"Running tests")
	@corepack pnpm nx run-many --target=test --all=true

# makes sure absolutely everything is working
.PHONY: validate
validate: env test build

##################################### BUILD ####################################

# builds all projects in the repo (libs and apps)
.PHONY: build
build: env
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
