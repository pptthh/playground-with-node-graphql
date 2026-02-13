import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';

// Use FlatCompat to reuse existing shareable configs (eslint-config-next)
const compat = new FlatCompat({ baseDirectory: __dirname });

export default defineConfig([
  // spread the legacy `next` configs into the flat format
  ...compat.extends('next', 'next/core-web-vitals'),

  // project-specific overrides / ignores
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]);
