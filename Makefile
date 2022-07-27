# standardise on a shell
export SHELL := /usr/bin/env bash

check-env:
# check whether fnm is installed, prompt to install it if not
	@type -t fnm > /dev/null  || { \
		echo -e "\x1b[31mThis project uses \x1b[1mfnm\x1b[0;31m to manage node versions.\x1b[0m"; \
		echo -e "You need to install it to continue."; \
		echo -e "Run \x1b[36mbrew install fnm\x1b[0m, or see \x1b[36mhttps://github.com/Schniz/fnm#installation\x1b[0m."; \
		echo ""; \
		exit 1; \
	}
	@fnm use --install-if-missing
	@corepack pnpm install

build: check-env
	@corepack pnpm nx run-many --target=build --all=true

test: check-env
	@corepack pnpm nx run-many --target=test --all=true
