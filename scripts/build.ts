import { webpackBuild, copyManifest } from './tasks';

async function build() {
  await webpackBuild();
  await copyManifest();
}

console.time('build-time');
build().then(() => {
  console.timeEnd('build-time');
});
