// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import prettier from 'prettier';
import { DEFAULT_COMMANDS } from '@jswork/node-gtc';
import fs from 'fs';
import { nodeGtc } from '@jswork/node-gtc';
import { execSync } from 'child_process';
import path from 'path';
import noop from '@jswork/noop';

const workspaceFolders = vscode.workspace.workspaceFolders;
const udpatePkg = (inPkgPath: string, inObj: Record<string, string>) => {
  // read package.json
  const pkg = JSON.parse(fs.readFileSync(inPkgPath).toString());
  // udpate package.json
  Object.keys(inObj).forEach((key) => (pkg[key] = inObj[key]));
  // write file
  fs.writeFileSync(inPkgPath, JSON.stringify(pkg, null, 2));
};

const createGtcrc = (inPath: string) => {
  const code = JSON.stringify(DEFAULT_COMMANDS);
  const prettyCode = prettier.format(code, { parser: 'json', tabWidth: 2, printWidth: 120 });
  if (!fs.existsSync(inPath)) fs.writeFileSync(inPath, prettyCode);
  return inPath;
};

const ensurePkg = (inPath: string) => {
  if (!fs.existsSync(inPath)) fs.writeFileSync(inPath, JSON.stringify({}));
  return inPath;
};

const ensureGtcrc = (inPath: string) => {
  if (!fs.existsSync(inPath)) createGtcrc(inPath);
  return inPath;
};

const gtcCore = () => {
  {
    if (!workspaceFolders) return { dispose: noop };

    const userDir = workspaceFolders[0].uri.fsPath;
    const packageJsonPath = ensurePkg(path.resolve(userDir, 'package.json'));
    const gtcrcPath = ensureGtcrc(path.resolve(userDir, '.gtcrc'));

    const gtcStr = fs.readFileSync(gtcrcPath, 'utf8');
    const options = JSON.parse(gtcStr) as any;

    vscode.window.showQuickPick(options.commands).then((selection: any) => {
      if (!selection) return;

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
    });
  }
};

const gtcInit = () => {
  if (!workspaceFolders) return { dispose: noop };
  const userDir = workspaceFolders[0].uri.fsPath;
  const targetPath = path.join(userDir, '.gtcrc');
  ensureGtcrc(targetPath);
  vscode.window.showInformationMessage('You have execute gtc-init successfully!');
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let cmd1 = vscode.commands.registerCommand('vscode-gtc.gtc', gtcCore);
  let cmd2 = vscode.commands.registerCommand('vscode-gtc.gtc:init', gtcInit);
  context.subscriptions.push(cmd1, cmd2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
