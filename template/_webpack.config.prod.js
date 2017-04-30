const { join } = require('path')
const webpack = require('webpack')

const mainConfig = {
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
  devtool: 'cheap-source-map',

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
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

const rendererConfig = {
  entry: {
    renderer: [
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
  devtool: 'cheap-source-map',

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
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}

module.exports = [mainConfig, rendererConfig]
