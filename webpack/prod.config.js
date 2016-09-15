const webpack = require('webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require ('compression-webpack-plugin')

module.exports = function(outputPath){
  return {
    devtool: 'source-map',

    entry: {
      main: [
        './app/index',
      ],
      vendor: [
        'debounce',
        'localforage',
        'react',
        'react-dom',
        'react-helmet',
        'react-infinite',
        'react-redux',
        'react-router',
        'react-router-google-analytics',
        'react-swipe',
        'react-tagsinput',
        'react-tap-event-plugin',
        'react-virtualized',
        'redux',
        'redux-batched-subscribe',
        'redux-thunk',
        'reselect',
        'swipe-js-iso',
      ],
    },

    module: {
      loaders: [{
        test: /\.scss$/,
        loader: 'style!css?minimize&module&localIdentName=[hash:base64:5]!postcss-loader!sass',
      }],
    },

    sassLoader: {
      includePaths: [ 'app/styles' ],
    },

    plugins: [
      new webpack.NoErrorsPlugin (),
      // Save all styles in bundle.css with extract-text-plugin
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Minify bundle
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        minimize: true,
        comments: false,
        debug: false,
        compress: {
          sequences: true,
          booleans: true,
          loops: true,
          unused: true,
          warnings: false,
          drop_console: true,
          unsafe: true,
          dead_code: true,
        },
      }),
      // provide promise and fetch
      new webpack.ProvidePlugin({
        Promise: 'exports?global.Promise!es6-promise',
        fetch: 'exports?self.fetch!whatwg-fetch',
      }),

      new HtmlWebpackPlugin({
        title: 'SB',
        description: 'Premier manga reading platform.',
        template: 'app/statics/index.ejs',
      }),

      //Cache shell files & covers
      new SWPrecacheWebpackPlugin({
        cacheId: 'SausageBrain',
        filename: 'precache-worker.js',
        navigateFallback: '/index.html',
        stripPrefix: outputPath,
      }),

      new CompressionPlugin ({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  }
}
