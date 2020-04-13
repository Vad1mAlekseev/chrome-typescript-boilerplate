import { webpackBuild, copyManifest } from './tasks';

async function build() {
  const stats = await webpackBuild();
  await copyManifest();
  return stats;
}

console.time('build-time');
build().then((stats) => {
  console.log(stats.toString());
  console.timeEnd('build-time');
});
