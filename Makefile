# standardise on a shell
export SHELL := /usr/bin/env bash

################################# CODE QUALITY #################################

.PHONY: test
test: install
	$(call log,"Running tests")
	@corepack pnpm nx run-many --target=test --all=true

.PHONY: validate # check absolutely everything
validate: install test build

##################################### BUILD ####################################

.PHONY: build
build: install
	$(call log,"Building projects")
	@corepack pnpm nx run-many --target=build --all=true

############################### MANAGING PACKAGES ##############################

# n.b. publishing is handled in CI using .github/workflows/changesets.yml

.PHONY: changeset
changeset: install
	$(call log,"Creating a new changeset")
	@corepack pnpm changeset

################################ INTERNAL UTILS ################################

# loosely styled logging for user feedback
define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

# Run this before every other task, to make sure you never run with
# outdated deps. If deps are up to date this is almost instant, so it has very
# little DX cost.
.PHONY: install # install dependencies
install: check-node-version
	$(call log,"Refreshing dependencies")
	@corepack pnpm install --frozen-lockfile

.PHONY: check-node-version # make sure we use the correct node version
check-node-version:
	$(call log,"Checking Node")
	@./tools/scripts/check-node-version
