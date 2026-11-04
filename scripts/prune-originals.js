// Runs after `vite build`: originals stay in the repo for the CMS, but visitors only need the variants.
import { readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(path.join(root, 'static', 'media', 'optimized', 'manifest.json'), 'utf8'));
const mediaOut = path.join(root, 'build', 'client', 'media');

const stillUsed = new Set(
  Object.values(manifest).flatMap((entry) => [entry.thumb.fallback, entry.hero.fallback].map(decodeURI))
);

let removed = 0;
for (const file of await readdir(mediaOut)) {
  if (!/\.(jpe?g|png)(\.br|\.gz)?$/i.test(file)) continue;
  if (stillUsed.has(`/media/${file.replace(/\.(br|gz)$/, '')}`)) continue;
  await rm(path.join(mediaOut, file));
  removed++;
}
await rm(path.join(mediaOut, 'optimized', 'manifest.json'), { force: true });
await rm(path.join(mediaOut, 'optimized', 'manifest.json.br'), { force: true });
await rm(path.join(mediaOut, 'optimized', 'manifest.json.gz'), { force: true });
console.log(`pruned ${removed} original image files from build`);
