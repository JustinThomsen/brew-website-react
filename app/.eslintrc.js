module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['babel-polyfill', 'babel-polyfill/dist/polyfill.min.js'],
          ['helper', './utils/helper'],
          ['material-ui/DatePicker', '../custom/DatePicker'],
          ['material-ui', 'material-ui-ie10'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'esprima',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
