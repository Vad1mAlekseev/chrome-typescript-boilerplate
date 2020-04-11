// node
import * as path from 'path';
import fs from 'fs';
// webpack
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// app
import manifest from '../src/chrome/manifest';

const isDev = process.env.NODE_ENV !== 'production';
const watch = !!process.env.webpack_watch;
const mode = isDev ? 'development' : 'production';

const projectRoot = path.resolve(__dirname, '..')
const chromePath = path.resolve(projectRoot, 'src', 'chrome');
const srcPath = path.resolve(projectRoot, 'src');
const buildPath = path.resolve(projectRoot, 'build');

const config: webpack.Configuration = {
  mode,
  watch,
  watchOptions: {
    ignored: undefined,
  },
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    popup: path.join(srcPath, 'popup', 'index.ts'),
    background: path.join(srcPath, 'background', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: buildPath,
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
      cleanStaleWebpackAssets: false, // чтобы не удалял папку при watch-моде
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(chromePath, 'icons'),
        to: path.join('.')
      }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  }
};

webpack(config, (err, stats) => {
  if (err) return console.error(err);
  // copy manifest
  const manifestDestination = path.join(buildPath, 'manifest.json');
  fs.writeFileSync(manifestDestination, JSON.stringify(manifest))

  console.info(stats.toString());
})
