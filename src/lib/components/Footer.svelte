<script lang="ts">
  import type { Locale, SiteSettings } from '$lib/content/types';

  import { href } from '$lib/i18n';

  let { settings, lang }: { settings: SiteSettings; lang: Locale } = $props();
  const footnotes = $derived(href(lang, '/footnotes'));
</script>

<footer>
  <div class="wrap row">
    <p>
      <strong>Abdulrahman Mousa</strong><br />
      <span class="meta">{settings.contact.location}</span>
    </p>
    <nav aria-label="Elsewhere">
      <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
      <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={settings.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={footnotes}>{settings.navigation.footnotes}</a>
    </nav>
  </div>
</footer>

<style>
  footer {
    margin-top: var(--section);
    padding-block: 2.5rem calc(2.5rem + env(safe-area-inset-bottom));
    border-top: 3px solid #111;
    background: var(--accent);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .meta {
    color: #111;
  }

  strong {
    font-stretch: 112%;
    font-weight: 700;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.5rem;
  }

  nav a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    overflow-wrap: anywhere;
  }
</style>
