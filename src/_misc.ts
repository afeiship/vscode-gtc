import fs from 'fs';
import prettier from 'prettier';
import { DEFAULT_COMMANDS } from '@jswork/node-gtc';

export const udpatePkg = (inPkgPath: string, inObj: Record<string, string>) => {
  // read package.json
  const pkg = JSON.parse(fs.readFileSync(inPkgPath).toString());
  // udpate package.json
  Object.keys(inObj).forEach((key) => (pkg[key] = inObj[key]));
  // write file
  fs.writeFileSync(inPkgPath, JSON.stringify(pkg, null, 2));
};

export const createGtcrc = (inPath: string) => {
  const code = JSON.stringify(DEFAULT_COMMANDS);
  const prettyCode = prettier.format(code, { parser: 'json', tabWidth: 2, printWidth: 120 });
  if (!fs.existsSync(inPath)) fs.writeFileSync(inPath, prettyCode);
  return inPath;
};

export const ensurePkg = (inPath: string) => {
  if (!fs.existsSync(inPath)) fs.writeFileSync(inPath, JSON.stringify({}));
  return inPath;
};

export const ensureGtcrc = (inPath: string) => {
  if (!fs.existsSync(inPath)) createGtcrc(inPath);
  return inPath;
};
