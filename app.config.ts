import * as path from 'path';

export interface IAppConfiguration {
  absPathToBuildFolder: string;
}

const absPathToBuildFolder = path.resolve(__dirname, 'build');

export default function getAppConfiguration(): IAppConfiguration {
  return {
    absPathToBuildFolder,
  }
}
