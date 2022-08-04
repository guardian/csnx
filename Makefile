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

.PHONY: build-changed
build-changed: install
	$(call log,"Building changed projects")
	@corepack pnpm nx affected --target=build

################################# PUTTING LIVE #################################

.PHONY: publish-to-npm
publish-to-npm: install build-changed
	$(call log,"Publishing packages to NPM")
	@./tools/scripts/publish-to-npm

################################ INTERNAL UTILS ################################

# loosely styled logging for user feedback
define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

.PHONY: install # install dependencies
install: check-node-version
	$(call log,"Refreshing dependencies")
	@corepack pnpm install --frozen-lockfile

.PHONY: check-node-version # make sure we use the correct node version
check-node-version:
	$(call log,"Checking Node")
	@./tools/scripts/check-node-version
