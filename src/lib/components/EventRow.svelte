<script lang="ts">
  import { href } from '$lib/i18n';
  import type { Event, Locale, Strings } from '$lib/content/types';

  let { event, lang, ui }: { event: Event; lang: Locale; ui: Strings } = $props();
</script>

<li class="row" class:plain={!event.image}>
  {#if event.image}
    <img src={event.image} alt="" width="640" height="400" loading="lazy" decoding="async" />
  {/if}
  <div class="text">
    <p class="meta">{event.time}{event.location ? `, ${event.location}` : ''}</p>
    <h3>{event.name}</h3>
    <div class="prose">{@html event.summary}</div>
    <p class="links">
      {#if event.project}
        <a href={href(lang, `/work/${event.project}`)}>{ui.caseStudy}</a>
      {/if}
      {#if event.link}
        <a href={event.link} target="_blank" rel="noopener noreferrer">{ui.linkedinPost}</a>
      {/if}
    </p>
  </div>
</li>

<style>
  .row {
    display: grid;
    gap: 1rem;
    padding-block: 1.5rem;
    border-top: 3px solid #111;
    container-type: inline-size;
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 4px;
    background: var(--raise);
  }

  .text {
    display: grid;
    gap: 0.5rem;
    align-content: start;
    min-width: 0;
  }

  h3 {
    font-size: 1.375rem;
    overflow-wrap: anywhere;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.5rem;
  }

  .links a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
  }

  @container (min-width: 40rem) {
    .row:not(.plain) {
      grid-template-columns: 13.75rem minmax(0, 1fr);
      column-gap: 2rem;
    }
  }
</style>
