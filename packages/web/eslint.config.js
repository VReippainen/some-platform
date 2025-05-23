import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint
  .config(
    { ignores: ['dist'] },
    {
      // If strictTypeChecked is too strict, you can use stylisticTypeChecked or recommendedTypeChecked instead
      extends: [
        js.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
      settings: { react: { version: '18.3' } },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        react,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/function-component-definition': [
          'error',
          { namedComponents: 'function-declaration' },
        ],
        'no-restricted-exports': ['error', { restrictDefaultExports: { direct: false } }],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'no-console': 'error',
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    },
  )
  .concat(eslintPluginPrettierRecommended);
