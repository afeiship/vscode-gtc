// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import gtcCore from './gtc.core';
import gtcInit from './gtc.init';

const workspaceFolders = vscode.workspace.workspaceFolders;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  if (!workspaceFolders) return;
  let cmd1 = vscode.commands.registerCommand('vscode-gtc.gtc', gtcCore);
  let cmd2 = vscode.commands.registerCommand('vscode-gtc.gtc:init', gtcInit);
  context.subscriptions.push(cmd1, cmd2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
