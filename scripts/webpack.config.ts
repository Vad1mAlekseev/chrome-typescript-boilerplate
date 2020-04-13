import * as path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import getConfig from '../app.config';

const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
const watch = !!process.env.webpack_watch;

const { absPathToBuildFolder } = getConfig();
const srcPath = path.resolve(__dirname, '..', 'src');

export default function getWebpackConfig(): webpack.Configuration {
  return {
    mode,
    watch,
    watchOptions: {
      ignored: undefined,
    },
    devtool: isDev ? 'inline-source-map' : false,
    entry: {
      popup: path.resolve(srcPath, 'popup', 'index.ts'),
      background: path.resolve(
        srcPath,
        'background',
        'index.ts'
      ),
    },
    output: {
      filename: '[name].js',
      path: absPathToBuildFolder,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false, // for correct work in watch mode
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(
          srcPath,
          'popup',
          'index.html'
        ),
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(srcPath, 'chrome', 'icons'),
          to: path.join('.'),
        },
      ]),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };
}
