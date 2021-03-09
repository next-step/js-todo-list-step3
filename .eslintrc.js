module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  plugins: ['react', 'html'],
  rules: {
    'no-var': 'warn',
    'no-undef': 0,
    'no-console': 'warn',
    'react/prop-types': 0,
  },
};
