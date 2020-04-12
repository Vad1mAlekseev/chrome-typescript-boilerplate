import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import getWebpackConfig from './webpack.config';
import getManifest from '../src/chrome/manifest';
import getAppConfig from '../app.config';

const { absPathToBuildFolder } = getAppConfig();

export function webpackBuild() {
  return new Promise<webpack.Stats>((res, rej) => {
    const config = getWebpackConfig();
    webpack(config, (err, stats) => {
      if (err) return rej(err);
      res(stats);
    });
  });
}

export function copyManifest() {
  const destination = path.resolve(absPathToBuildFolder, 'manifest.json');
  const formattedManifest = JSON.stringify(getManifest());
  return new Promise<void>((res, rej) => {
    fs.writeFile(destination, formattedManifest, (err) => {
      if (err) return rej(err);
      res();
    });
  });
}
