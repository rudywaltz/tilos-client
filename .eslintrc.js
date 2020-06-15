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
      plugins: ['cypress'],
    },
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {},
};
