import type { Linter } from 'eslint';

const config: Linter.Config = {
  extends: ['next', 'next/core-web-vitals'],
  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
};

export default config;
