module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'sort-keys': 'off',
    'no-return-await': 'error',
    'no-warning-comments': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/singleline-html-element-content-newline': 'off',
    '@typescript-eslint/indent': ['error', 2],
    indent: 'off',
  },
  overrides: [
    {
      files: ['*vue'],
      rules: {
        '@typescript-eslint/indent': 'off',
        indent: 'off',
      },
    },
  ],
}
