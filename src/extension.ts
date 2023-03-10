// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { nodeGtc, DEFAULT_COMMANDS } from '@jswork/node-gtc';
import { execSync } from 'child_process';
import fs from 'fs';

const cwd = process.cwd();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const options = [
    { label: '🍏 发布到 beta 环境', value: 'beta' },
    { label: '🍐 发布到 staging 环境', value: 'staging' },
    { label: '🍎 发布到 production 环境', value: 'production' },
    { label: '🍞 仅更新 cache 的 node_modules', value: 'cache' }
  ];

  let disposable1 = vscode.commands.registerCommand('vscode-gtc.gtc', () => {
    vscode.window.showQuickPick(options).then((selection) => {
      if (selection) {
        const { icon, cmds, message } = nodeGtc(options, selection.value);
        try {
          // 1. udpate package.json
          const pkg = require(`${cwd}/package.json`);
          pkg.gtc = message;
          fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(pkg, null, 2));

          // 2. exec cmds to commit gtc changes.
          execSync(cmds.join(' && ')).toString();

          // 3.1 show success message if success.
          vscode.window.showInformationMessage(
            `You have execute '${icon}-${selection.value}' successfully!`
          );
        } catch (e) {
          // 3.2 show error message if failed.
          vscode.window.showErrorMessage(`You have execute '${icon}-${selection.value}' failed!`);
        }
      }
    });
  });

  let disposable2 = vscode.commands.registerCommand('vscode-gtc.gtc:init', () => {
    // generate `.gtcrc` file
    fs.writeFileSync('.gtcrc', JSON.stringify(DEFAULT_COMMANDS, null, 2));
    vscode.window.showInformationMessage('You have execute gtc-init successfully!');
  });

  context.subscriptions.push(disposable1, disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
