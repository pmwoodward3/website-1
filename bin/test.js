const fs = require('fs')
const path = require('path')
const config = JSON.parse(fs.readFileSync('./.babelrc'))

// Remove prop-types, webpack alias
const ignore = [
  'babel-plugin-transform-react-remove-prop-types',
  ['babel-plugin-webpack-alias', {
    config: path.join(__dirname, '/../webpack/common.config.js'),
  }],
]

const hook = require('css-modules-require-hook')
hook({
  extensions: ['.css', '.scss'],
  generateScopedName: process.env.NODE_ENV === 'production'
    ? '[hash:base64:5]'
    : '[path]__[name]__[local]',
})

config.plugins = config.plugins.concat(ignore)
require('babel-core/register')(config)

require('asset-require-hook')({
  extensions: ['jpg', 'png'],
})

global.__CLIENT__ = false

require('../app/test/setup.js')
