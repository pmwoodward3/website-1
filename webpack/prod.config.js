const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CompressionPlugin = require ('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',

  entry: {
    main: [
      './app/index',
    ],
    // vendor: [
    //   'debounce',
    //   'localforage',
    //   'react',
    //   'react-dom',
    //   'react-helmet',
    //   'react-infinite',
    //   'react-redux',
    //   'react-router',
    //   'react-router-google-analytics',
    //   'react-tagsinput',
    //   'react-virtualized',
    //   'redux',
    //   'redux-batched-subscribe',
    //   'redux-thunk',
    //   'reselect',
    //   'seamless-immutable',
    // ],
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader',
          loader: 'css?minimize&module&localIdentName=[hash:base64:5]!postcss-loader!sass',
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: 'style-loader',
          loader: 'css?minimize',
        }),
      },
    ],
  },

  sassLoader: {
    includePaths: [ 'app/styles' ],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.NoErrorsPlugin (),
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
      title: 'Shiba',
      description: 'Premier manga reading platform.',
      template: 'app/statics/index.ejs',
      minify: {
        removeOptionalTags: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        collapseWhitespace: true,
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),

    // new CompressionPlugin ({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    //
    new OfflinePlugin({
      caches: 'all',
      publicPath: '/',
      relativePaths: false,
      updateStrategy: 'all',
      externals: [],
      excludes: ['**/*.gz'],
      ServiceWorker: {
        output: 'offline-worker.js',
        navigateFallbackURL: '/',
      },
      AppCache: {
        FALLBACK: { '/': '/index.html' },
      },
    }),
  ],
}
