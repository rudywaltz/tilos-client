module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:@getify/proper-arrows/getify-says'],
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['**/*.svelte', '**/*.html'],
      processor: 'svelte3/svelte3',
    },
    {
      files: 'cypress/**/**',
      extends: ['plugin:cypress/recommended'],
      rules: {
        'cypress/no-force': 'warn',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    eqeqeq: ['error', 'smart'], //https://github.com/getify/You-Dont-Know-JS/blob/b008e0e91ceab2e2759a40feb4ae2b99aaee9372/types-grammar/ch4.md#loose-equals-vs-strict-equals
  },
};
