module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['last', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  globals: {},
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: "none"
      }
    ],
    eqeqeq: ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};
