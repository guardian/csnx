# standardise on a shell
export SHELL := /usr/bin/env bash

##################################### BUILD ####################################

.PHONY: build
build: install
	$(call log,"Building projects")
	@corepack pnpm nx run-many --target=build --all=true

.PHONY: hello-world
hello-world: install
	$(call log,"Saying hello")
	@echo "Hello world"

################################# CODE QUALITY #################################

.PHONY: test
test: install
	$(call log,"Running tests")
	@corepack pnpm nx run-many --target=test --all=true

.PHONY: validate # check absolutely everything
validate: install test build

################################ INTERNAL UTILS ################################

# loosely styled logging for user feedback
define log
    @echo -e "\x1b[2m$(1)\x1b[0m"
endef

.PHONY: install # install dependencies
install: use-node-version
	$(call log,"Refreshing dependencies")
	@corepack pnpm install --frozen-lockfile

.PHONY: use-node-version # use the correct node version
ifeq ($(CI),) # if _not_ in CI, use fnm to set the node version for this session
use-node-version: check-fnm
	$(call log,"Checking Node")
	@fnm use --install-if-missing
else # use the node version installed in the CI environment
use-node-version:
	$(call log,"Using pre-installed Node")
	@node -v
endif

.PHONY: check-fnm # check whether fnm is installed - if not, prompt to install it
check-fnm:
	@type -t fnm > /dev/null  || { \
		echo -e "\x1b[31mThis project uses \x1b[1mfnm\x1b[0;31m to manage node versions.\x1b[0m"; \
		echo -e "You need to install it to continue."; \
		echo -e "Run \x1b[36mbrew install fnm\x1b[0m, or see \x1b[36mhttps://github.com/Schniz/fnm#installation\x1b[0m."; \
		echo ""; \
		exit 1; \
	}
