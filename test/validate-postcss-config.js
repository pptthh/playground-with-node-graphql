// Simple Node test to validate the exported PostCSS config
require('ts-node/register/transpile-only');

const config = require('../postcss.config.ts')?.default || require('../postcss.config.ts');

if (!config || typeof config !== 'object') {
  console.error('postcss.config.ts did not export an object.');
  process.exit(1);
}

if (!config.plugins || !config.plugins['@tailwindcss/postcss']) {
  console.error('Tailwind PostCSS plugin not found in postcss config.');
  process.exit(2);
}

console.log('postcss.config.ts looks valid');
process.exit(0);
