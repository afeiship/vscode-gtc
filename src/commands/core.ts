import * as vscode from 'vscode';
import fs from 'fs';
import { nodeGtc, GtcVersion } from '@jswork/node-gtc';
import { execSync } from 'child_process';
import path from 'path';
import { ensureGtcrc, ensurePkg, udpatePkg } from '../_misc';
const workspaceFolders = vscode.workspace.workspaceFolders;

const getGtcVersion = (inCmd, inPkg, inOptions) => {
  const { autoVersion } = inOptions;
  const isProduction = inCmd === 'production';
  const isCache = inCmd === 'cache';
  const curGtcVersion = inPkg.gtcVersion || '1.0.0';
  const method = isProduction ? 'release' : 'patch';
  const identity = isCache ? 'beta' : inCmd;
  const newGtcVersion = GtcVersion[method](curGtcVersion, identity);
  return autoVersion ? newGtcVersion : curGtcVersion;
};

export default class GtcCoreCommand {
  static execute() {
    const userDir = workspaceFolders![0].uri.fsPath;
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
        const gtcVersion = getGtcVersion(selection.value, packageJsonPath, options);
        udpatePkg(packageJsonPath, { gtc: message, gtcVersion });
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
}
