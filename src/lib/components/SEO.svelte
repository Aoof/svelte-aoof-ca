<script lang="ts">
  import { href } from '$lib/i18n';
  import type { Locale } from '$lib/content/types';

  let {
    title = '',
    description,
    lang,
    path = '/',
    image = '/BotQuest.jpeg',
    jsonLd
  }: {
    title?: string;
    description: string;
    lang: Locale;
    path?: string;
    image?: string;
    jsonLd?: Record<string, unknown>;
  } = $props();

  const origin = 'https://aoof.ca';
  const fullTitle = $derived(title ? `${title} | Abdulrahman Mousa` : 'Abdulrahman Mousa (aoof)');
  const url = $derived(origin + href(lang, path));
  const picture = $derived(image.startsWith('http') ? image : origin + image);
  const ld = $derived(jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>` : '');
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
  <meta property="og:image" content={picture} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={picture} />
  {#if ld}{@html ld}{/if}
</svelte:head>
