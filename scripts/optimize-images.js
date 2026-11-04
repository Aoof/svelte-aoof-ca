import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const mediaDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'static', 'media');
const outDir = path.join(mediaDir, 'optimized');
const sourceExt = /\.(jpe?g|png)$/i;
const sizes = { thumb: 640, hero: 1120 };

// The extension stays in the stem so logo.jpg and logo.png never share outputs.
const stemOf = (file) => {
  const { name, ext } = path.parse(file);
  return `${name}-${ext.slice(1)}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

async function variant(file, input, originalSize, isPng, meta, target) {
  const stem = `${stemOf(file)}-${target}w`;
  const fallbackExt = isPng ? 'png' : 'jpg';
  const resize = () => sharp(input).rotate().resize({ width: target, withoutEnlargement: true });
  const fallbackFile = path.join(outDir, `${stem}.${fallbackExt}`);

  await Promise.all([
    resize().webp({ quality: 80 }).toFile(path.join(outDir, `${stem}.webp`)),
    resize().avif({ quality: 65 }).toFile(path.join(outDir, `${stem}.avif`)),
    (isPng ? resize().png({ compressionLevel: 9 }) : resize().jpeg({ quality: 85, mozjpeg: true })).toFile(
      fallbackFile
    )
  ]);

  // Re-encoding a small PNG can grow it; keep the original as the fallback then.
  let fallback = `/media/optimized/${stem}.${fallbackExt}`;
  if (target >= meta.width && (await stat(fallbackFile)).size >= originalSize) {
    await rm(fallbackFile);
    fallback = `/media/${encodeURI(file)}`;
  }

  return {
    webp: `/media/optimized/${stem}.webp`,
    avif: `/media/optimized/${stem}.avif`,
    fallback,
    width: target
  };
}

async function build(file) {
  const input = path.join(mediaDir, file);
  const isPng = /\.png$/i.test(file);
  const meta = await sharp(input).metadata();
  const { size } = await stat(input);

  const targets = [...new Set(Object.values(sizes).map((width) => Math.min(width, meta.width)))];
  const built = new Map();
  for (const target of targets) {
    built.set(target, await variant(file, input, size, isPng, meta, target));
  }

  const entry = { width: meta.width, height: meta.height };
  for (const [key, width] of Object.entries(sizes)) {
    entry[key] = built.get(Math.min(width, meta.width));
  }
  return entry;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const files = (await readdir(mediaDir)).filter((file) => sourceExt.test(file));
const manifest = {};
for (const file of files) {
  manifest[`/media/${file}`] = await build(file);
}

await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`optimized ${files.length} images`);
