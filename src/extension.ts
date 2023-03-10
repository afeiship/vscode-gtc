import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  // gtc:help
  context.subscriptions.push(
    vscode.commands.registerCommand("gtc:help", () => {
      vscode.window.showInformationMessage("Gtc help?");
    })
  );
}
