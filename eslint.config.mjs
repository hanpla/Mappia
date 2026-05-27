import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import importXPlugin from 'eslint-plugin-import-x';

const eslintConfig = defineConfig([
  // 기본 추천 설정 및 Next.js 설정
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,

  // 검사 제외 대상
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
      prettier: prettierPlugin,
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
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
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

      // Import rules
      'import-x/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import-x/prefer-default-export': 'off',

      'import-x/no-unresolved': 'off',

      // Prettier 통합
      'prettier/prettier': 'error',

      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // any 타입 사용 금지
      '@typescript-eslint/no-explicit-any': 'error',

      // type 정의 시 interface 사용
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // console.log 사용 시 경고
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 변수 선언 시 const 사용 강제
      'prefer-const': 'error',

      // 불필요한 fragment 사용 방지
      'react/jsx-no-useless-fragment': 'warn',

      // html 요소는 props spreading 허용, custom 컴포넌트는 금지
      'react/jsx-props-no-spreading': [
        'error',
        { html: 'ignore', custom: 'enforce' },
      ],

      // JSX를 사용하는 파일에서만 .jsx, .tsx 확장자 사용
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.tsx'] },
      ],

      // 네이밍 컨벤션
      '@typescript-eslint/naming-convention': [
        'error',
        {
          // 일반 변수는 camelCase, 상수는 UPPER_CASE, 컴포넌트는 PascalCase
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          // 함수는 camelCase(hook 등) 또는 PascalCase(컴포넌트)
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          // interface는 PascalCase
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          // boolean 변수는 is, has, should 접두사 필수
          selector: 'variable',
          types: ['boolean'],
          format: ['camelCase'],
          prefix: ['is', 'has', 'should'],
        },
      ],
    },
  },

  // Prettier 설정을 마지막에 두어 충돌 방지
  prettierConfig,
]);

export default eslintConfig;
