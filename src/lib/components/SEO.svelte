<script lang="ts">
  import { href } from '$lib/i18n';
  import { jsonForScript } from '$lib/content/safe';
  import type { Locale } from '$lib/content/types';

  let {
    title = '',
    description,
    lang,
    path = '/',
    image = '/og/default.png',
    imageSize,
    jsonLd,
    breadcrumbs
  }: {
    title?: string;
    description: string;
    lang: Locale;
    path?: string;
    image?: string;
    imageSize?: { width: number; height: number };
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    breadcrumbs?: { name: string; url: string }[];
  } = $props();

  const origin = 'https://aoof.ca';
  const fullTitle = $derived(title ? `${title} | Abdulrahman Mousa` : 'Abdulrahman Mousa (aoof)');
  const url = $derived(origin + href(lang, path));
  const picture = $derived(image.startsWith('http') ? image : origin + image);

  // Handle both single object and array of JSON-LD objects
  const ldArray = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
  const ldScripts = $derived(
    ldArray.length > 0
      ? ldArray.map((ld) => `<script type="application/ld+json">${jsonForScript(ld)}<\/script>`).join('\n')
      : ''
  );

  // Generate BreadcrumbList schema if breadcrumbs provided
  const breadcrumbLd = $derived(
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url.startsWith('http') ? crumb.url : origin + crumb.url
          }))
        }
      : null
  );
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  <link rel="alternate" hreflang="en" href={origin + href('en', path)} />
  <link rel="alternate" hreflang="fr" href={origin + href('fr', path)} />
  <link rel="alternate" hreflang="x-default" href={origin + href('en', path)} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Abdulrahman Mousa" />
  <meta property="og:locale" content={lang === 'fr' ? 'fr_CA' : 'en_CA'} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:locale:alternate" content={lang === 'fr' ? 'en_CA' : 'fr_CA'} />
  <meta property="og:image" content={picture} />
  <meta property="og:image:alt" content={fullTitle} />
  {#if image.startsWith('/og/')}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {:else if imageSize}
    <meta property="og:image:width" content={String(imageSize.width)} />
    <meta property="og:image:height" content={String(imageSize.height)} />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={picture} />
  <meta name="twitter:image:alt" content={fullTitle} />
  {#if ldScripts}{@html ldScripts}{/if}
  {#if breadcrumbLd}
    <script type="application/ld+json">{jsonForScript(breadcrumbLd)}</script>
  {/if}
</svelte:head>
