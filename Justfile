# logseq-expand-by-level
# darkone@darkone.yt

_default:
	@just --list

# Launch Vite dev server
dev:
	npm run dev

# Clean build outputs
clean:
	rm -rf dist
	@echo "Cleaned dist/"

# Build the plugin
build:
	npm run build

# Bump version and create git tag: just bump [patch|minor|major]
bump type="patch":
	#!/usr/bin/env bash
	set -euo pipefail
	OLD=$(node -p "require('./package.json').version")
	npm version {{type}} --no-git-tag-version --no-commit-hooks > /dev/null
	NEW=$(node -p "require('./package.json').version")
	echo "Bumping $OLD → $NEW"
	git add package.json package-lock.json
	git commit -m "Release v$NEW"
	git tag "v$NEW"
	echo "Done — run: git push && git push --tags"
