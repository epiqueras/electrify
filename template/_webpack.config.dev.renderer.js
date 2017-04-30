const { join } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    renderer: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/renderer/index.js',
    ],
  },

  target: 'electron-renderer',

  output: {
    filename: '[name].js',
    path: join(__dirname, './built'),
    publicPath: '/',
  },

  context: __dirname,
  devtool: 'eval',

  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/',
  },

  resolve: {
    extensions: ['*', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}
