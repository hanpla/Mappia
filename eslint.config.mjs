import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import importXPlugin from 'eslint-plugin-import-x';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.next/**',
    'node_modules/**',
    'dist/**',
    'build/**',
    'next-env.d.ts',
  ]),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'import-x': importXPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    rules: {
      // 컴포넌트는 함수 선언식, 내부 익명 컴포넌트는 화살표 함수
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Import 순서 (빈 줄은 Prettier가 처리하므로 ignore)
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '{react,react/**,next,next/**}',
              group: 'external',
              position: 'before',
            },
            { pattern: '@/stores/**', group: 'internal', position: 'before' },
            { pattern: '@/lib/**', group: 'internal', position: 'before' },
            { pattern: '@/hooks/**', group: 'internal', position: 'before' },
            {
              pattern: '@/constants/**',
              group: 'internal',
              position: 'before',
            },
            { pattern: '@/types/**', group: 'internal', position: 'before' },
            { pattern: '@/styles/**', group: 'internal', position: 'before' },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'ignore',
        },
      ],

      // 네이밍 컨벤션
      '@typescript-eslint/naming-convention': [
        'error',
        {
          // 변수는 camelCase, 상수는 UPPER_CASE, 컴포넌트 참조는 PascalCase
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          // 함수는 camelCase(일반 함수, hook), PascalCase(컴포넌트)
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          // boolean 변수는 is, has, should 접두사 필수
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should'],
        },
      ],
    },
  },
  // Prettier와 충돌하는 포맷팅 규칙 일괄 off
  prettierConfig,
]);

export default eslintConfig;
