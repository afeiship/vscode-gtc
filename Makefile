# Makefile
PLUGIN_NAME = vscode-gtc

.PHONY: publish

publish:
	@echo "Publishing $(PLUGIN_NAME)..."
	npm version patch
	@git commit -am "chore: Bump patch version"
	$(eval PLUGIN_VERSION := $(shell npm pkg get version | xargs echo))
	RELEASE_TAG="$(PLUGIN_VERSION)"

	echo "Publishing $(PLUGIN_NAME) $(PLUGIN_VERSION)..."

	# publish to vsce marketplace
	# @vsce publish --yarn
	# @git add . && git commit -m "Release $(PLUGIN_VERSION)"
	# @git push && git push --tags
	
	# # github release
	# @gh release create $(RELEASE_TAG) \
	# --title "$(RELEASE_TAG)" \
	# --notes "Release $(RELEASE_TAG)"
