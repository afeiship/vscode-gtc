import noop from '@jswork/noop';
import { DEFAULT_COMMANDS } from '@jswork/node-gtc';
import * as vscode from 'vscode';
import fs from 'fs';
import path from 'path';

const workspaceFolders = vscode.workspace.workspaceFolders;

export default () => {
  if (!workspaceFolders) return Promise.resolve({ dispose: noop });
  const userDir = workspaceFolders[0].uri.fsPath;
  const targetPath = path.join(userDir, '.gtcrc');
  fs.writeFileSync(targetPath, JSON.stringify(DEFAULT_COMMANDS, null, 2));
  vscode.window.showInformationMessage('You have execute gtc-init successfully!');
};
