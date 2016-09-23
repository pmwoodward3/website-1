module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
    serviceworker: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      classes: true

    }

  },
  globals: {
    React: true,
    expect: true,
    sinon: true,
  },
  plugins: [
    'react'

  ],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    'semi': ['error', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'constructor-super': 'error',
    'no-confusing-arrow': 'error',
    'no-constant-condition': 'error',
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-var': 'warn',
    'no-this-before-super': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'require-yield': 'error',
    'jsx-quotes': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-undef': 'warn',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-danger': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-multi-comp': 'warn',
    'react/no-set-state': 'warn',
    'react/no-unknown-property': 'warn',
    'react/prefer-es6-class': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/require-extension': 'warn',
    'react/self-closing-comp': 'warn',
    'react/sort-comp': 'warn',
    'react/wrap-multilines': 'warn'

  }

}
