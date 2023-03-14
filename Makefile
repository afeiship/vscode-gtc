# Makefile

# 该插件的名称，你需要替换成你自己的插件名称
PLUGIN_NAME = vscode-gtc

# 该插件的版本号，你需要替换成你自己的插件版本号
PLUGIN_VERSION = $(shell npm version patch --no-git-tag-version)

# vsce 命令行工具路径
VSCE = $(shell npm bin)/vsce

# gh 命令行工具路径
GH = $(shell npm bin)/gh

# 发布插件
publish:
    @echo "Publishing $(PLUGIN_NAME) $(PLUGIN_VERSION)..."
    vsce publish patch --yarn
    @git add .
    @git commit -m "Release $(PLUGIN_VERSION)"
    @git tag $(PLUGIN_VERSION)
	git push origin $(PLUGIN_VERSION)
    @$(GH) release create $(PLUGIN_VERSION) -t "$(PLUGIN_VERSION)" -b "Release $(PLUGIN_VERSION)"
