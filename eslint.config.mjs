import eslint from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/dist'] },
  {
    extends: [
      stylistic.configs.recommended,
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    files: [
      'source/**/*.{ts,vue}',
      'eslint.config.mjs',
      'stylelint.config.mjs',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      '@stylistic/semi': [1, 'never'],
      '@stylistic/quotes': [1, 'single'],
      '@stylistic/brace-style': [1, '1tbs', { allowSingleLine: true }],
      '@stylistic/object-curly-spacing': [1, 'always'],
      '@stylistic/operator-linebreak': [1, 'after'],
      '@stylistic/no-multiple-empty-lines': 1,
      '@stylistic/spaced-comment': 1,
      '@stylistic/space-infix-ops': 1,
      'arrow-body-style': [1, 'as-needed', { requireReturnForObjectLiteral: true }],
      'max-nested-callbacks': [1, 6],
      'no-duplicate-imports': 1,
      'no-extend-native': 1,
      'no-extra-bind': 1,
      'no-unexpected-multiline': 1,
      'no-unused-expressions': 1,
      'no-useless-backreference': 1,
      'prefer-rest-params': 1,
      strict: 1,
      '@stylistic/comma-dangle': [1, {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }],
      '@stylistic/quote-props': [1, 'as-needed'],
      'prefer-const': 1,
      'no-var': 1,
    },
  }
)

// const JS = 'js,mjs,cjs,jsx,mjsx'
// const TS = 'ts,tsx,mtsx'
// const SHARED_RULES = {
//   '@stylistic/semi': [1, 'never'],
//   '@stylistic/quotes': [1, 'single'],
//   '@stylistic/brace-style': [1, '1tbs', { allowSingleLine: true }],
//   '@stylistic/object-curly-spacing': [1, 'always'],
//   '@stylistic/operator-linebreak': [1, 'after'],
//   '@stylistic/no-multiple-empty-lines': 1,
//   '@stylistic/spaced-comment': 1,
//   '@stylistic/space-infix-ops': 1,
//   'arrow-body-style': [1, 'as-needed', { requireReturnForObjectLiteral: true }],
//   'max-nested-callbacks': [1, 6],
//   'no-duplicate-imports': 1,
//   'no-extend-native': 1,
//   'no-extra-bind': 1,
//   'no-unexpected-multiline': 1,
//   'no-unused-expressions': 1,
//   'no-useless-backreference': 1,
//   'prefer-rest-params': 1,
//   strict: 1,
//   '@stylistic/comma-dangle': [1, {
//     arrays: 'always-multiline',
//     objects: 'always-multiline',
//     imports: 'always-multiline',
//     exports: 'always-multiline',
//     functions: 'never',
//   }],
//   '@stylistic/quote-props': [1, 'as-needed'],
//   'prefer-const': 1,
//   'no-var': 1,
// }

// /** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
// const globalConfig = {
//   name: 'global',
//   files: [
//     'eslint.config.mjs',
//     'stylelint.config.js',
//     `source/**/*.{${JS},${TS}}`,
//   ],
//   extends: [
//     eslint.configs.recommended,
//     stylistic.configs.recommended,
//   ],
//   plugins: {
//     '@stylistic': stylistic,
//   },
//   settings: {
//     componentWrapperFunctions: ['observer'],
//   },
//   languageOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   linterOptions: {
//     // noInlineConfig: true,
//     reportUnusedDisableDirectives: 'error',
//   },
//   rules: {
//     ...SHARED_RULES,
//   },
// }

// /** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
// const jsConfig = {
//   name: 'javascript',
//   files: [
//     `source/**/*.{${JS}`,
//   ],
//   rules: {
//     ...SHARED_RULES,
//   },
//   languageOptions: {
//     globals: {
//       ...globals.browser,
//     },
//   },
// }

// /** @type {import('typescript-eslint').InfiniteDepthConfigWithExtends} */
// const tsConfig = {
//   name: 'typescript',
//   files: [
//     `source/**/*.{${TS}}`,
//   ],
//   extends: [
//     tseslint.configs.recommended,
//     importPlugin.flatConfigs.recommended, // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
//     importPlugin.flatConfigs.typescript,
//   ],
//   settings: {
//     'import/resolver': {
//       typescript: {
//         alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
//         project: './tsconfig.json',
//       },
//     },
//   },
//   languageOptions: {
//     parserOptions: {
//       projectService: true,
//       tsconfigRootDir: import.meta.dirname,
//     },
//     globals: {
//       ...globals.browser,
//     },
//   },
//   rules: {
//     '@typescript-eslint/consistent-type-definitions': [1, 'interface'],
//     '@typescript-eslint/method-signature-style': [1, 'property'],
//     '@typescript-eslint/naming-convention': [
//       1,
//       {
//         selector: 'variableLike',
//         format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
//       },
//       { selector: 'memberLike', format: ['camelCase', 'PascalCase', 'snake_case'] },
//       { selector: 'typeLike', format: ['PascalCase'] },
//       {
//         selector: 'property',
//         format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
//       },
//       { selector: 'method', format: ['camelCase'] },
//       {
//         selector: [
//           'classProperty',
//           'objectLiteralProperty',
//           'typeProperty',
//           'classMethod',
//           'objectLiteralMethod',
//           'typeMethod',
//           'accessor',
//           'enumMember',
//         ],
//         format: null,
//         modifiers: ['requiresQuotes'],
//       },
//     ],
//     '@typescript-eslint/no-confusing-non-null-assertion': 1,
//     '@typescript-eslint/no-dynamic-delete': 1,
//     '@typescript-eslint/no-loop-func': 1,
//     '@typescript-eslint/no-shadow': 1,
//     '@typescript-eslint/no-unused-expressions': 1,
//     '@typescript-eslint/no-unused-vars': 1,
//     '@typescript-eslint/no-var-requires': 'off',
//     '@typescript-eslint/parameter-properties': 1,
//     '@typescript-eslint/sort-type-union-intersection-members': 'off',
//     '@typescript-eslint/unified-signatures': 1,
//     // The 'import' plugin supports separately importing types
//     //   (@typescript-eslint/no-duplicate-imports is deprecated)
//     'import/no-duplicates': 1,
//     'import/no-named-as-default-member': 'off', // We are bundling constants and utils atm. TODO: review and refactor.
//     // Turn off ESLint's version of this rule when in TypeScript
//     'no-duplicate-imports': 'off',
//     // It is recommended that this check is disabled for TS files, see: (update: link is dead)
//     // https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
//     'no-unused-expressions': 'off',
//     'no-useless-backreference': 'off',

//     // hmm why it was like this before? let's remove.
//     'prefer-spread': 1,

//     ...SHARED_RULES,
//   },
// }
