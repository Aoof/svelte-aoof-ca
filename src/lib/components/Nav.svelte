<script lang="ts">
  import { page } from '$app/state';
  import { href, swapLang } from '$lib/i18n';
  import ResumePicker from './ResumePicker.svelte';
  import type { Locale, SiteSettings, Track } from '$lib/content/types';

  let { lang, settings, tracks }: { lang: Locale; settings: SiteSettings; tracks: Track[] } = $props();

  const items = [
    { key: 'work', path: '/work' },
    { key: 'experience', path: '/experience' },
    { key: 'events', path: '/events' },
    { key: 'contact', path: '/contact' }
  ];

  let open = $state(false);

  const other = $derived<Locale>(lang === 'fr' ? 'en' : 'fr');
  const pathname = $derived(page.url.pathname);
  const switchHref = $derived(swapLang(pathname, other));
  const current = (path: string) => {
    const full = href(lang, path);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  // Close the menu after any navigation.
  $effect(() => {
    pathname;
    open = false;
  });

  // Keep the page behind the phone menu from scrolling.
  $effect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && (open = false)} />

<header class="bar">
  <div class="inner wrap">
    <a class="brand" href={href(lang)}>{settings.brand}</a>

    <nav class="links" aria-label="Main">
      {#each items as item (item.key)}
        <a href={href(lang, item.path)} aria-current={current(item.path) ? 'page' : undefined}>
          {settings.navigation[item.key]}
        </a>
      {/each}
    </nav>

    <div class="tools">
      <a class="lang" href={switchHref} hreflang={other} lang={other}>{settings.navigation.language}</a>
      <span class="resume">
        <ResumePicker {tracks} {lang} ui={settings.ui.resume} label={settings.navigation.resume} closeLabel={settings.navigation.close} />
      </span>
      <button
        class="menu btn-quiet"
        type="button"
        aria-expanded={open}
        aria-controls="sheet"
        onclick={() => (open = !open)}
      >
        {open ? settings.navigation.close : settings.navigation.menu}
      </button>
    </div>
  </div>

  {#if open}
    <div id="sheet" class="sheet">
      <nav aria-label="Main">
        {#each items as item (item.key)}
          <a href={href(lang, item.path)} aria-current={current(item.path) ? 'page' : undefined}>
            {settings.navigation[item.key]}
          </a>
        {/each}
      </nav>
      <ResumePicker {tracks} {lang} ui={settings.ui.resume} label={settings.navigation.resume} closeLabel={settings.navigation.close} />
    </div>
  {/if}
</header>

<style>
  .bar {
    position: sticky;
    top: 0;
    z-index: 30;
    background: var(--raise);
    border-bottom: 3px solid #111;
  }

  .inner {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    height: 4rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    padding: 0 0.7rem;
    border: 3px solid #111;
    border-radius: 8px;
    background: var(--key);
    box-shadow: 3px 3px 0 #111;
    rotate: -2deg;
    font-stretch: 125%;
    font-weight: 900;
    font-size: 1.125rem;
    letter-spacing: -0.01em;
    text-decoration: none;
    transition: rotate 150ms var(--ease);
  }

  .brand:hover {
    rotate: 1deg;
  }

  .links {
    display: none;
  }

  .tools {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .lang {
    display: inline-grid;
    place-items: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    font-stretch: 112%;
    font-weight: 650;
    text-decoration: none;
  }

  .lang:hover {
    color: var(--key-ink);
  }

  .resume {
    display: none;
  }

  .sheet {
    position: fixed;
    inset: 4rem 0 0 0;
    z-index: 25;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem var(--gutter) calc(2rem + env(safe-area-inset-bottom));
    background: var(--raise);
    overflow-y: auto;
  }

  .sheet nav {
    display: flex;
    flex-direction: column;
  }

  .sheet nav a {
    padding: 1rem 0;
    border-bottom: 3px solid #111;
    font-stretch: 125%;
    font-weight: 800;
    font-size: 1.75rem;
    text-decoration: none;
  }

  .sheet a[aria-current='page'] {
    color: var(--key-ink);
  }

  @media (min-width: 1024px) {
    .links {
      display: flex;
      gap: 0.25rem;
      margin-left: 1rem;
    }

    .links a {
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      padding: 0 0.75rem;
      font-stretch: 112%;
      font-weight: 600;
      text-decoration: none;
    }

    .links a:hover {
      color: var(--key-ink);
    }

    .links a[aria-current='page'] {
      text-decoration: underline;
      text-decoration-color: var(--key-ink);
      text-decoration-thickness: 4px;
      text-underline-offset: 0.4em;
    }

    .resume {
      display: inline-flex;
      margin-left: 0.5rem;
    }

    .menu,
    .sheet {
      display: none;
    }
  }
</style>
