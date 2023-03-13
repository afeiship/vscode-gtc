import * as vscode from 'vscode';
import { nodeGtc, DEFAULT_COMMANDS } from '@jswork/node-gtc';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureGtcrc, ensurePkg, udpatePkg } from './_misc';

// 获取当前打开的工作区或文件夹
const workspaceFolders = vscode.workspace.workspaceFolders;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  if (!workspaceFolders) return;
  const userDir = workspaceFolders[0].uri.fsPath;
  const packageJsonPath = ensurePkg(path.resolve(userDir, 'package.json'));
  const gtcrcPath = ensureGtcrc(path.resolve(userDir, '.gtcrc'));

  const gtcStr = fs.readFileSync(gtcrcPath, 'utf8');
  const options = JSON.parse(gtcStr) as any;

  let disposable1 = vscode.commands.registerCommand('vscode-gtc.gtc', () => {
    vscode.window.showQuickPick(options.commands).then((selection: any) => {
      if (selection) {
        const { icon, cmds, message } = nodeGtc(options, selection.value);
        const iconValue = `${icon}/${selection.value}`;
        const progressOpts = {
          location: vscode.ProgressLocation.Notification,
          title: `You are use gtc publish '${iconValue}'...`,
          cancellable: false
        };

        try {
          // 1. udpate package.json
          udpatePkg(packageJsonPath, { gtc: message });
          // 2. use gtc publish
          vscode.window.withProgress(progressOpts, () => {
            cmds.unshift(`cd ${userDir}`);
            return new Promise((resolve) => {
              execSync(cmds.join(' && '));
              vscode.window.showInformationMessage(`You have execute '${iconValue}' successfully!`);
              resolve(null);
            });
          });
        } catch (e) {
          vscode.window.showErrorMessage(`You have execute '${iconValue}' failed!`);
        }
      }
    });
  });

  let disposable2 = vscode.commands.registerCommand('vscode-gtc.gtc:init', () => {
    // generate `.gtcrc` file
    const targetPath = path.join(userDir, '.gtcrc');
    ensureGtcrc(targetPath);
    vscode.window.showInformationMessage('You have execute gtc-init successfully!');
  });

  context.subscriptions.push(disposable1, disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
