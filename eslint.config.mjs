import { defineConfig } from 'eslint/config';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';

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
    },

    rules: {
      ...mergedRules,
      'jsx-a11y/alt-text': [
        'warn',
        { elements: ['img'], img: ['Image'] },
      ],
      'import/no-anonymous-default-export': 'warn',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: 'module', ecmaFeatures: { jsx: true }, warnOnUnsupportedTypeScriptVersion: true },
    },
  },

  {
    files: ['**/*.{jsx,tsx,js}'],
    settings: { react: { version: 'detect' } },
    rules: {
      ...(reactHooksPlugin.configs?.recommended?.rules ?? {}),
      ...(jsxA11yPlugin.configs?.recommended?.rules ?? {}),
      'react/prop-types': 'off',
    },
  },
]);
