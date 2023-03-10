// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const options = [
    { value: "beta", label: "Deploy to beta" },
    { value: "production", label: "Deploy to production" },
    { value: "cache", label: "Update cache" },
  ];

  let disposable = vscode.commands.registerCommand("vscode-gtc.gtc", () => {
    vscode.window.showQuickPick(options).then((selection) => {
      if (selection) {
        console.log(selection);
        vscode.window.showInformationMessage(`You selected ${selection.value}`);
      }
    });
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
