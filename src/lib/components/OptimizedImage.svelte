<script lang="ts">
  import type { ImageVariants } from '$lib/content/types';

  let {
    src,
    variants,
    alt,
    width,
    height,
    sizes = '100vw',
    loading = 'lazy',
    fetchpriority
  }: {
    src: string;
    variants?: ImageVariants;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    loading?: 'lazy' | 'eager';
    fetchpriority?: 'high' | 'low' | 'auto';
  } = $props();

  const srcset = (format: 'avif' | 'webp' | 'fallback') =>
    variants
      ? [variants.thumb, variants.hero]
          .filter((set, i, all) => all.findIndex((other) => other.width === set.width) === i)
          .map((set) => `${set[format]} ${set.width}w`)
          .join(', ')
      : '';
</script>

{#if variants}
  <picture>
    <source type="image/avif" srcset={srcset('avif')} {sizes} />
    <source type="image/webp" srcset={srcset('webp')} {sizes} />
    <img
      src={variants.hero.fallback}
      srcset={srcset('fallback')}
      {sizes}
      {alt}
      {width}
      {height}
      {loading}
      {fetchpriority}
      decoding="async"
    />
  </picture>
{:else}
  <img {src} {alt} {width} {height} {loading} {fetchpriority} decoding="async" />
{/if}
