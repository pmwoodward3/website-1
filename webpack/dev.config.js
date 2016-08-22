const webpack = require('webpack')

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: {
    main: ['webpack-hot-middleware/client', './app/index'],
  },

  resolve: {
    unsafeCache: true,
  },

  module: {
    // Loader fo css modules (https://github.com/gajus/react-css-modules)
    loaders: [{
      test: /\.scss$/,
      loader: 'style!css?module&localIdentName=[path]__[name]__[local]!postcss-loader!sass',
    }],
  },

  sassLoader: {
    includePaths: [ 'app/styles' ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}
