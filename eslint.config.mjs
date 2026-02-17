import { defineConfig } from 'eslint/config';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import checkFilePlugin from 'eslint-plugin-check-file';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const mergedRules = {
  ...(importPlugin.configs?.recommended?.rules ?? {}),
};

const mergedSettings = {
  react: { version: 'detect' },
  'import/parsers': {
    '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
  },
  'import/resolver': {
    'eslint-import-resolver-node': { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    'eslint-import-resolver-typescript': { alwaysTryTypes: true },
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
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'check-file': checkFilePlugin,
    },

    rules: {
      ...mergedRules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/alt-text': [
        'warn',
        { elements: ['img'], img: ['Image'] },
      ],
      'import/no-anonymous-default-export': 'warn',
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx,js,jsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: 'module', ecmaFeatures: { jsx: true }, warnOnUnsupportedTypeScriptVersion: true },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },


]);
