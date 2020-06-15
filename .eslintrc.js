module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [],
  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly',
  // },
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
  rules: {
    // indent: ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
  },
};
