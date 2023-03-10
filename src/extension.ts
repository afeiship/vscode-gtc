// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import nodeGtc from "@jswork/node-gtc";
import { execSync } from "child_process";
import fs from "fs";

const cwd = process.cwd();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const options = [
    { value: "beta", label: "🍏 Deploy to beta" },
    { value: "production", label: "🍎 Deploy to production" },
    { value: "cache", label: "🍞 Update cache" },
  ];

  let disposable = vscode.commands.registerCommand("vscode-gtc.gtc", () => {
    vscode.window.showQuickPick(options).then((selection) => {
      if (selection) {
        const { icon, cmds, message } = nodeGtc(options, selection.value);
        try {
          // 1. udpate package.json
          const pkg = require(`${cwd}/package.json`);
          pkg.gtc = message;
          fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(pkg, null, 2));

          // 2. exec cmds to commit gtc changes.
          execSync(cmds.join(" && ")).toString();

          // 3.1 show success message if success.
          vscode.window.showInformationMessage(
            `You have execute '${icon}-${selection.value}' successfully!`
          );
        } catch (e) {
          // 3.2 show error message if failed.
          vscode.window.showErrorMessage(
            `You have execute '${icon}-${selection.value}' failed!`
          );
        }
      }
    });
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
