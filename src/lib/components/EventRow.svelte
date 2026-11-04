<script lang="ts">
  import Icon from './Icon.svelte';
  import OptimizedImage from './OptimizedImage.svelte';
  import { href } from '$lib/i18n';
  import type { Event, Locale, Strings } from '$lib/content/types';

  // One event as a compact card. `index` picks the colour and icon of the placeholder.
  let { event, lang, ui, index = 0 }: { event: Event; lang: Locale; ui: Strings; index?: number } = $props();

  const tracks = ['web', 'game', 'qa', 'software'];
  const icons = ['coffee', 'hat', 'cat', 'code'];
  const slot = $derived(index % 4);
</script>

<li class="card" data-track={tracks[slot]}>
  <div class="thumb" class:placeholder={!event.image}>
    {#if event.image}
      <OptimizedImage
        src={event.image}
        variants={event.imageVariants}
        alt={event.name}
        width={640}
        height={360}
        sizes="(min-width: 40rem) 24rem, 100vw"
      />
    {:else}
      <Icon name={icons[slot]} size={56} />
    {/if}
  </div>

  <div class="body">
    <p class="when">{event.time}</p>
    <h3>{event.name}</h3>
    {#if event.location}<p class="meta">{event.location}</p>{/if}
    <div class="prose">{@html event.summary}</div>
    {#if event.project || event.link}
      <p class="links">
        {#if event.project}
          <a href={href(lang, `/work/${event.project}`)}>{ui.caseStudy}</a>
        {/if}
        {#if event.link}
          <a href={event.link} target="_blank" rel="noopener noreferrer">{ui.linkedinPost}</a>
        {/if}
      </p>
    {/if}
  </div>
</li>

<style>
  .card {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    border: var(--border);
    border-radius: 10px;
    background: var(--raise);
    box-shadow: var(--hard);
    list-style: none;
  }

  .thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-bottom: 3px solid #111;
    background: var(--sunk);
  }

  .thumb :global(picture) {
    display: contents;
  }

  .thumb :global(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumb.placeholder {
    display: grid;
    place-items: center;
    background: var(--accent);
  }

  .body {
    display: grid;
    gap: 0.5rem;
    align-content: start;
    padding: 1rem 1.1rem 1.25rem;
  }

  .when {
    justify-self: start;
    padding: 0.1rem 0.6rem;
    border: 2px solid #111;
    border-radius: 999px;
    background: var(--accent);
    font-stretch: 90%;
    font-weight: 700;
    font-size: 0.9375rem;
  }

  h3 {
    font-size: 1.3rem;
    overflow-wrap: anywhere;
  }

  .meta {
    margin: 0;
  }

  .prose {
    font-size: 0.9875rem;
    line-height: 1.55;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.25rem;
    margin-top: 0.25rem;
  }

  .links a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-stretch: 112%;
    font-weight: 700;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
  }
</style>
