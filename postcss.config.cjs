// Load the TypeScript PostCSS config using ts-node so PostCSS (and Next) can require it.
require('ts-node/register/transpile-only');
module.exports = require('./postcss.config.ts').default;
