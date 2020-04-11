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
    background: path.resolve(__dirname, 'src', 'background', 'app.ts'),
  },
  output: {
    filename: '[name].js',
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'chrome', 'manifest.json'),
        to: '.',
        transform(content) {
          return Buffer.from(JSON.stringify({
            ...JSON.parse(content.toString()),
            name: process.env.npm_package_name,
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
          }));
        },
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'chrome', 'icons'),
        to: path.join('.')
      }
    ])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
