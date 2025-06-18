import eslint from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/public'] },
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
      'no-useless-escape': [1, { allowRegexCharacters: ['-'] }],
    },
  }
)
