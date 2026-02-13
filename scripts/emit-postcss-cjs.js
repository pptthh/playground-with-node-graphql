// Transpile `postcss.config.ts` into `postcss.config.cjs` for Next/Turbopack runtime.
// This is intentionally simple and only supports plain-serializable config objects.
const fs = require('fs');
const path = require('path');
require('ts-node/register/transpile-only');

const cfg = require(path.resolve(process.cwd(), 'postcss.config.ts'))?.default;
if (!cfg || typeof cfg !== 'object') {
  console.error('postcss.config.ts did not export a config object');
  process.exit(1);
}

const outPath = path.resolve(process.cwd(), 'postcss.config.cjs');
const code = 'module.exports = ' + JSON.stringify(cfg, null, 2) + '\n';
fs.writeFileSync(outPath, code, 'utf8');
console.log('Wrote', outPath);
