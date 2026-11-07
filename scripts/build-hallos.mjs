import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const source = join(root, 'hallos');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(args, cwd, extraEnv = {}) {
  execFileSync(npm, args, {cwd, stdio: 'inherit', env:{...process.env,...extraEnv}, shell: process.platform === 'win32'});
}
if (!existsSync(join(source, 'src', 'App.jsx'))) throw new Error('Missing original HallOS source');
// npm ci guarantees exact bundled HallOS dependency lockfile.
run(['ci', '--no-audit', '--no-fund'], source);
run(['run','build'], source, {VITE_HALLOS_LOCAL_DEMO:'true'});
const destination=join(root,'public','rawlings','app');
rmSync(destination,{recursive:true,force:true});
mkdirSync(destination,{recursive:true});
cpSync(join(source,'dist'),destination,{recursive:true});
run(['run','build:site'],root);
