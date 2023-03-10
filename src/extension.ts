// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { nodeGtc, DEFAULT_COMMANDS } from '@jswork/node-gtc';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 获取当前打开的工作区或文件夹
const workspaceFolders = vscode.workspace.workspaceFolders;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const options = [
    { label: '🍏 发布到 beta 环境', value: 'beta' },
    { label: '🍐 发布到 staging 环境', value: 'staging' },
    { label: '🍎 发布到 production 环境', value: 'production' },
    { label: '🍞 仅更新 cache 的 node_modules', value: 'cache' }
  ];

  if (!workspaceFolders) return;
  const userDir = workspaceFolders[0].uri.fsPath;
  const packageJsonPath = path.join(userDir, 'package.json');

  let disposable1 = vscode.commands.registerCommand('vscode-gtc.gtc', () => {
    vscode.window.showQuickPick(options).then((selection) => {
      if (selection) {
        const { icon, cmds, message } = nodeGtc(options, selection.value);
        try {
          // 1. udpate package.json
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath).toString());
          pkg.gtc = message;
          fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

          // 2. use gtc publish
          vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              title: `You are use gtc publish '${icon}/${selection.value}'...`,
              cancellable: false
            },
            () => {
              cmds.unshift(`cd ${userDir}`);
              return new Promise((resolve, reject) => {
                execSync(cmds.join(' && '));
                vscode.window.showInformationMessage(`You have execute '${icon}/${selection.value}' successfully!`);
                resolve(null);
              });
            }
          );
        } catch (e) {
          vscode.window.showErrorMessage(`You have execute '${icon}/${selection.value}' failed!`);
        }
      }
    });
  });

  let disposable2 = vscode.commands.registerCommand('vscode-gtc.gtc:init', () => {
    // generate `.gtcrc` file
    const targetPath = path.join(userDir, '.gtcrc');
    fs.writeFileSync(targetPath, JSON.stringify(DEFAULT_COMMANDS, null, 2));
    vscode.window.showInformationMessage('You have execute gtc-init successfully!');
  });

  context.subscriptions.push(disposable1, disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
