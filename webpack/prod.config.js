const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = function(outputPath){
  return {
    devtool: 'source-map',

    entry: {
      main: ['./app/index'],
    },

    module: {
      // Loader fo css modules (https://github.com/gajus/react-css-modules)
      // Working with extract text plugin (https://github.com/webpack/extract-text-webpack-plugin)
      loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader',
          loader: 'css?minimize&module&localIdentName=[hash:base64:5]!postcss-loader!sass',
        }),
      }],
    },

    sassLoader: {
      includePaths: [ 'app/styles' ],
    },

    plugins: [
      // Save all styles in bundle.css with extract-text-plugin
      new ExtractTextPlugin('bundle.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Minify bundle
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      // provide promise and fetch
      new webpack.ProvidePlugin({
        Promise: 'exports?global.Promise!es6-promise',
        fetch: 'exports?self.fetch!whatwg-fetch',
      }),

      //Cache shell files & covers
      new SWPrecacheWebpackPlugin({
        cacheId: 'SausageBrain',
        filename: 'precache-worker.js',
        navigateFallback: '/index.html',
        stripPrefix: outputPath,
      }),
    ],
  }
}
