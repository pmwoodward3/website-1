const webpack = require('webpack')
const merge = require('webpack-merge')
const development = require('./dev.config.js')
const production = require('./prod.config.js')
const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

let devUrl

// Location dist for dev and prod
if (process.env.NODE_ENV === 'development') {
  devUrl = 'http://localhost:3000/dist/'
}

if (process.env.NODE_ENV === 'production') {
  devUrl = '/dist/'
}

const outputPath = path.join(__dirname, '/../dist/')

const common = {
  output: {
    path: outputPath,
    publicPath: devUrl,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss'],
    modulesDirectories: ['node_modules'],
    // Webpack alias for beautiful import
    alias: {
      components: path.join(__dirname, '../app/components/'),
      'redux/actions': path.join(__dirname, '../app/redux/actions'),
      'redux/selectors': path.join(__dirname, '../app/redux/selectors'),
      constants: path.join(__dirname, '../app/constants/'),
      utils: path.join(__dirname, '../app/utils/'),
      test: path.join(__dirname, '../app/test/'),
      statics: path.join(__dirname, '../app/statics/'),
    },
  },

  module: {
    loaders: [{
      // Loader for fonts (ttf)
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    }, {
      // Loader for fonts (otf)
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-otf',
    }, {
      // Loader for images (svg)
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      // Loader for js
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      // Loader for images (png)
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      // Loader for images (jpg)
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }, {
      // Loader for images (gif)
      test: /\.gif$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /manifest\.json$/,
      loader: 'w3c-manifest?icon=[name].[ext]&legacyAppleSupport=true',
    }],
  },

  plugins: [
    // Define global constants
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV === 'development' ? '"development"' : '"production"',
      },
      __DEVELOPMENT__: process.env.NODE_ENV === 'development',
      __PRODUCTION__: process.env.NODE_ENV === 'production',
      __CLIENT__: true,
    }),

    // Chunks for generate vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 2,
      name: 'vendor',
    }),

    //Cache shell files & covers
    new SWPrecacheWebpackPlugin({
      cacheId: 'SausageBrain',
      filename: 'precache-worker.js',
      stripPrefix: outputPath,
    }),
  ],

  postcss: () => [
    require('postcss-partial-import'),
    require('postcss-nested'),
    require('postcss-short'),
    require('autoprefixer')({
      browsers: ['> 5%'],
      remove: false,
    }),
  ],
}

if (process.env.NODE_ENV === 'development') {
  module.exports = merge(development, common)
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(production, common)
}
