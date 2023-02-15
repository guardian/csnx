#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

dev-nginx setup-app ${DIR}/nginx-mappings.yml

echo "🌎 Successfully installed config. https://atoms-rendering.local.dev-gutools.co.uk/ is now setup."