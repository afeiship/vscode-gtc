# Makefile
PLUGIN_NAME = vscode-gtc

.PHONY: publish

publish:
	@echo "Publishing $(PLUGIN_NAME)..."
	@npm version patch
	@vsce publish --yarn
	@git push && git push --tags
	# get new version number
	PLUGIN_VERSION=`node -p "require('./package.json').version"`
	@gh release create $(PLUGIN_VERSION) -t "$(PLUGIN_VERSION)" -b "Release $(PLUGIN_VERSION)"
