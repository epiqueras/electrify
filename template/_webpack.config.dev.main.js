const { join } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: [
      './src/main/index.js',
    ],
  },

  target: 'electron-main',
  externals: [{ 'electron-config': 'electron-config' }],

  node: { __dirname: false },

  output: {
    filename: '[name].js',
    path: join(__dirname, './built'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },

  context: __dirname,
  devtool: 'eval',

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
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
