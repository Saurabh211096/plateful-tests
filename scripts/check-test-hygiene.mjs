// Checks the test code for things that must not be merged.
//   ERROR: test.only / describe.only (would skip every other test), hard-coded Production URLs
//   WARN:  page.waitForTimeout (fixed waits make tests slow and flaky; prefer web-first assertions)
import fs from 'node:fs';
import path from 'node:path';

const roots = ['tests', 'pages', 'fixtures', 'utils'];
const files = [];
const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.ts')) files.push(p);
  }
};
roots.forEach(walk);

let errors = 0;
let warnings = 0;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const at = `${f.replace(/\\/g, '/')}:${i + 1}`;
    if (/\b(test|describe)(\.describe)?\.only\s*\(/.test(line)) { console.log(`ERROR ${at}  .only() must not be committed`); errors++; }
    if (/localhost:4200/.test(line) && !f.endsWith('env.ts')) { console.log(`ERROR ${at}  Production URL in test code`); errors++; }
    if (/waitForTimeout\s*\(/.test(line)) { console.log(`WARN  ${at}  fixed wait (waitForTimeout)`); warnings++; }
  });
}
console.log(`Checked ${files.length} files: ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
