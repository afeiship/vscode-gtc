import noop from '@jswork/noop';
import * as vscode from 'vscode';
import path from 'path';
import { ensureGtcrc } from './_misc';

const workspaceFolders = vscode.workspace.workspaceFolders;

export default () => {
  if (!workspaceFolders) return { dispose: noop };
  const userDir = workspaceFolders[0].uri.fsPath;
  const targetPath = path.join(userDir, '.gtcrc');
  ensureGtcrc(targetPath);
  vscode.window.showInformationMessage('You have execute gtc-init successfully!');
};
