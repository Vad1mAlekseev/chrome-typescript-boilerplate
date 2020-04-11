const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');?

const isDev = process.env.NODE_ENV !== 'production';
const mode = isDev ? 'development' : 'production';

const config = {
  mode,
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    popup: path.resolve(__dirname, 'src', 'popup', 'index.ts'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src', 'manifest.json'),
        to: '.',
      },
    ]),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.html' ],
  },
};

module.exports = config;
