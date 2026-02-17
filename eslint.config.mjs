import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import checkFilePlugin from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

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

const [ERROR, WARN, OFF] = ['error', 'warn', 'off'];

const lintConfig = ([
  { ignores: [
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'eslint.config.mjs',
    'tailwind.config.ts'
  ] },

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
      ...eslint.configs.all.rules,
      ...tseslint.configs.strict.rules,
      'no-undef': OFF,
      'no-ternary': OFF,
      'no-negated-condition': OFF,
      'func-style': OFF,
      

      'jsx-a11y/alt-text': [WARN,{ elements: ['img'], img: ['Image'] },],
      'import/no-anonymous-default-export': [WARN],
      'curly': [WARN, 'all'],
      'nonblock-statement-body-position': [WARN, 'below'],
      'no-console': [WARN, { allow: ['debug', 'warn', 'error'] }],
      'no-magic-numbers': [WARN, { ignore: [-1, 0, 1], ignoreArrayIndexes: true, enforceConst: true }],
      'sort-imports': [WARN, { ignoreCase: true, ignoreDeclarationSort: true }],
      'sort-keys': [WARN, 'asc', { caseSensitive: false, minKeys: 2 }],
      'camelcase': [WARN, { properties: 'always' }],
      'eqeqeq': [WARN, 'always', { null: 'ignore' }],
      'new-cap': [WARN, { newIsCap: true, capIsNew: false }],
      'one-var': [WARN, { var: 'never', let: 'never'}],
      'id-length': [WARN, { min: 2, exceptions: ['x', 'y', 'z'] }],
      'capitalized-comments': [WARN, 'always'],
      'arrow-body-style': [WARN, 'as-needed'],
      'require-unicode-regexp': [WARN],
      'max-lines-per-function': [WARN, { max: 100, skipComments: true, skipBlankLines: false }],
      'consistent-return': [WARN],
      // 'func-style': [WARN, 'expression'],
      'require-await': [WARN],

      
      'check-file/filename-naming-convention': [ERROR, {'**/*.{ts,tsx,js,jsx}': 'KEBAB_CASE'}, {ignoreMiddleExtensions: true}],
      'no-eval': ERROR,
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
      '@typescript-eslint/no-unused-vars': [ERROR, { argsIgnorePattern: '^_' }],
      '@typescript-eslint/prefer-as-const': WARN,
    },
  },
]);

export default defineConfig(lintConfig);
