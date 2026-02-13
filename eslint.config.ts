import { defineConfig } from 'eslint/config';

// Import plugin recommended configs directly to avoid `extends` resolution issues
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');

const mergedRules = {
  // only include import-plugin recommended rules globally; keep React/JSX rules scoped
  ...(importPlugin.configs?.recommended?.rules ?? {}),
};

const mergedSettings = {
  react: { version: 'detect' },
  'import/parsers': {
    [require.resolve('@typescript-eslint/parser')]: ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
  },
  'import/resolver': {
    [require.resolve('eslint-import-resolver-node')]: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    [require.resolve('eslint-import-resolver-typescript')]: { alwaysTryTypes: true },
  },
};

export default defineConfig([
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.eslintrc.ts', 'eslint.config.ts', 'tailwind.config.ts'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },

    settings: mergedSettings,

    plugins: {
      'react-hooks': require('eslint-plugin-react-hooks'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
      import: require('eslint-plugin-import'),
    },

    rules: {
      ...mergedRules,
      // apply jsx-a11y warning for images and Next Image component
      'jsx-a11y/alt-text': [
        'warn',
        { elements: ['img'], img: ['Image'] },
      ],
      'import/no-anonymous-default-export': 'warn',
    },
  },

  // TypeScript-specific config (flat-config uses file-matched entries)
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: { sourceType: 'module', ecmaFeatures: { jsx: true }, warnOnUnsupportedTypeScriptVersion: true },
    },
  },

  // React/JSX-specific rules (only apply to files that can contain JSX)
  {
    files: ['**/*.{jsx,tsx,js}'],
    settings: { react: { version: 'detect' } },
    rules: {
      ...(reactHooksPlugin.configs?.recommended?.rules ?? {}),
      ...(jsxA11yPlugin.configs?.recommended?.rules ?? {}),
      // project-level overrides for JSX files
      'react/prop-types': 'off',
    },
  },
]);
