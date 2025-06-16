export default {
  files: [
    'source/**/*.{css,vue}',
  ],
  extends: [
    '@stylistic/stylelint-config',
    'stylelint-config-recommended-vue'
  ],
  defaultSeverity: 'warning',
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'at-rule-empty-line-before': null,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'comment-empty-line-before': null,
    'comment-whitespace-inside': [
      'always',
      {
        severity: 'warning',
      },
    ],
    'custom-property-empty-line-before': null,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        severity: 'warning',
      },
    ],
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-block-no-shorthand-property-overrides': [
      true,
      {
        severity: 'warning',
      },
    ],
    'declaration-block-single-line-max-declarations': [
      1,
      {
        severity: 'warning',
      },
    ],
    'declaration-empty-line-before': null,
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        severity: 'warning',
      },
    ],
    'function-calc-no-unspaced-operator': [
      true,
      {
        severity: 'warning',
      },
    ],
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-name-case': [
      'lower',
      {
        severity: 'warning',
      },
    ],
    'keyframe-declaration-no-important': [
      true,
      {
        severity: 'warning',
      },
    ],
    'length-zero-no-unit': [
      true,
      {
        severity: 'warning',
      },
    ],
    'media-feature-name-no-unknown': true,
    // somewhat useful, yet often frivolous. removing for now.
    'no-descending-specificity': null,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': [
      true,
      {
        severity: 'warning',
      },
    ],
    'no-empty-source': true,

    'no-invalid-double-slash-comments': [
      true,
      {
        severity: 'warning',
      },
    ],
    'property-no-unknown': [
      true,
      {
        severity: 'warning',
      },
    ],
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        severity: 'warning',
      },
    ],
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    'selector-pseudo-element-colon-notation': [
      'double',
      {
        severity: 'warning',
      },
    ],
    'selector-type-case': [
      'lower',
      {
        severity: 'warning',
      },
    ],
    'string-no-newline': [true, { severity: 'warning' }],
    'unit-no-unknown': true,
    '@stylistic/string-quotes': ['single', { severity: 'warning' }],
    '@stylistic/max-line-length': [
      120,
      {
        ignore: ['comments'],
        severity: 'warning',
      },
    ],
    'function-calc-no-unspaced-operator': [true, { severity: 'warning' }]
  },
}
