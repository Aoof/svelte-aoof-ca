<script lang="ts">
  import { href, period, duration } from '$lib/i18n';
  import type { Experience, Locale, Strings } from '$lib/content/types';

  let { entry, lang, ui, id }: { entry: Experience; lang: Locale; ui: Strings; id: string } = $props();

  const current = $derived(entry.end === '');
  const when = $derived(
    period(lang, entry.start, entry.end, { present: ui.present, expected: ui.expected }, entry.expected)
  );
  const length = $derived(entry.expected ? '' : duration(entry.start, entry.end, ui));
  const siteName = $derived(entry.link?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''));
  const showMore = $derived((ui.showMore ?? '').replace('{n}', String(entry.moreCount ?? 0)));
</script>

<li class="item" class:current {id}>
  <span class="node" aria-hidden="true"></span>
  <article class="card block-card">
    <header>
      <p class="org">{entry.location}</p>
      <h3>{entry.title}</h3>
      <p class="meta when">
        <span>{when}</span>
        {#if length}<span class="length">{length}</span>{/if}
        {#if current}<span class="pill">{ui.now}</span>{/if}
      </p>
    </header>

    <div class="prose">{@html entry.descriptionLead ?? entry.description}</div>

    {#if entry.descriptionMore}
      <details>
        <summary>
          <span class="when-closed">{showMore}</span>
          <span class="when-open">{ui.showLess}</span>
        </summary>
        <div class="prose">{@html entry.descriptionMore}</div>
      </details>
    {/if}

    {#if entry.project || entry.link}
      <p class="links">
        {#if entry.project}
          <a class="btn-quiet" href={href(lang, `/work/${entry.project}`)}>{ui.readMore}</a>
        {/if}
        {#if entry.link}
          <a class="btn-quiet" href={entry.link} target="_blank" rel="noopener noreferrer">
            {entry.project ? ui.visitSite : siteName}<span aria-hidden="true"> ↗</span>
          </a>
        {/if}
      </p>
    {/if}
  </article>
</li>

<style>
  .item {
    position: relative;
    padding-left: 2.25rem;
    scroll-margin-top: 6rem;
  }

  .node {
    position: absolute;
    left: 0;
    top: 1.6rem;
    width: 1.1rem;
    height: 1.1rem;
    border: var(--border);
    border-radius: 3px;
    background: var(--raise);
    translate: -50% 0;
  }

  .current .node {
    background: var(--key);
    box-shadow: var(--hard-small);
  }

  .card {
    display: grid;
    gap: 1rem;
    padding: 1.25rem;
    min-width: 0;
  }

  header {
    display: grid;
    gap: 0.25rem;
  }

  .org {
    margin: 0;
    font-stretch: 125%;
    font-weight: 900;
    font-size: 1.25rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  h3 {
    font-size: 1.0625rem;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .when {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 0.75rem;
    margin: 0.25rem 0 0;
  }

  .length::before {
    content: '·';
    margin-right: 0.75rem;
  }

  .pill {
    padding: 0.1rem 0.6rem;
    border: 2px solid var(--line);
    border-radius: 999px;
    background: var(--key);
    color: var(--on-key);
    font-stretch: 100%;
    font-weight: 800;
    font-size: var(--t-small);
  }

  /* Bullet lists inside a card */
  .prose :global(ul) {
    display: grid;
    gap: 0.6rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .prose :global(li) {
    position: relative;
    padding-left: 1.4rem;
  }

  .prose :global(li)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 0.5rem;
    height: 0.5rem;
    border: 2px solid var(--line);
    background: var(--key);
  }

  details > .prose {
    margin-top: 0.75rem;
  }

  summary {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0.25rem 0.9rem;
    border: 2px solid var(--line);
    border-radius: 8px;
    background: var(--raise);
    font-stretch: 112%;
    font-weight: 700;
    cursor: pointer;
    list-style: none;
    transition: background-color 150ms;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    background: var(--key-soft);
  }

  .when-open,
  details[open] .when-closed {
    display: none;
  }

  details[open] .when-open {
    display: inline;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.5rem;
    margin: 0;
  }

  @media (min-width: 640px) {
    .item {
      padding-left: 3rem;
    }

    .card {
      padding: 1.5rem 1.75rem;
    }
  }
</style>
