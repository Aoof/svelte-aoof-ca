<script lang="ts">
  import Icon from './Icon.svelte';
  import OptimizedImage from './OptimizedImage.svelte';
  import ToolList from './ToolList.svelte';
  import { href, period } from '$lib/i18n';
  import type { Locale, Project, Strings } from '$lib/content/types';

  let { project, lang, ui }: { project: Project; lang: Locale; ui: Strings } = $props();

  const when = $derived(
    project.when ?? period(lang, project.start, project.end, { present: ui.present })
  );
  const first = $derived(project.tracks[0] ?? 'web');
  const trackIcons: Record<string, string> = { web: 'coffee', game: 'hat', qa: 'cat', software: 'code' };
</script>

<!-- The li is the container, so the row inside can answer to its width. -->
<li class="item">
  <div class="row" data-track={first}>
    <div class="thumb" class:placeholder={!project.image}>
      {#if project.image}
        <OptimizedImage
          src={project.image}
          variants={project.imageVariants}
          alt={project.name}
          width={640}
          height={400}
          sizes="(min-width: 56rem) 15rem, (min-width: 34rem) 11rem, 100vw"
        />
      {:else}
        <Icon name={trackIcons[first] ?? 'coffee'} size={56} />
      {/if}
    </div>

    <div class="text">
      <h3><a href={href(lang, `/work/${project.slug}`)}>{project.name}</a></h3>
      <p class="summary">{project.summary}</p>
      {#if project.stack.length}
        <div class="stack"><ToolList tools={project.stack} /></div>
      {/if}
    </div>

    {#if when}
      <p class="when meta">{when}</p>
    {/if}
  </div>
</li>

<style>
  .item {
    container-type: inline-size;
    list-style: none;
  }

  .row {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem 1.25rem;
    align-items: start;
    padding: 1rem;
    border: var(--border);
    border-radius: 10px;
    background: var(--raise);
    box-shadow: var(--hard);
    transition:
      translate 120ms var(--ease),
      box-shadow 120ms var(--ease);
  }

  .thumb {
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 10;
    border: 3px solid #111;
    border-radius: 6px;
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

  /* One link per row: its hit area covers the whole row. */
  h3 a {
    text-decoration: none;
  }

  h3 a::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .row:hover {
    translate: -2px -2px;
    box-shadow: 7px 7px 0 #111;
  }

  .row:hover h3 a {
    text-decoration: underline;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
  }

  .summary {
    max-width: var(--measure);
  }

  .when {
    margin: 0;
  }

  @container (min-width: 34rem) {
    .row {
      grid-template-columns: 11rem minmax(0, 1fr);
    }

    .when {
      grid-column: 2;
    }
  }

  @container (min-width: 56rem) {
    .row {
      grid-template-columns: 15rem minmax(0, 1fr) auto;
    }

    .when {
      grid-column: 3;
      grid-row: 1;
      text-align: right;
      white-space: nowrap;
    }
  }
</style>
