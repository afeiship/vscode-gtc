import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('gtc:help', () => {
            // vscode show alert message
            // execute command in terminal
            vscode.window.showInformationMessage('Hello World!\n Are you ok?');
        })
    );
}
