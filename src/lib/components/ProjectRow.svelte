<script lang="ts">
  import ToolList from './ToolList.svelte';
  import { href, period } from '$lib/i18n';
  import type { Locale, Project, Strings } from '$lib/content/types';

  let { project, lang, ui }: { project: Project; lang: Locale; ui: Strings } = $props();

  const when = $derived(
    project.when ?? period(lang, project.start, project.end, { present: ui.present })
  );
</script>

<li class="row" class:plain={!project.image}>
  {#if project.image}
    <img src={project.image} alt="" width="640" height="400" loading="lazy" decoding="async" />
  {/if}
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
</li>

<style>
  .row {
    position: relative;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: var(--border);
    border-radius: 10px;
    background: var(--raise);
    box-shadow: var(--hard);
    transition:
      translate 120ms var(--ease),
      box-shadow 120ms var(--ease);
    container-type: inline-size;
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border: 3px solid #111;
    border-radius: 6px;
    background: var(--sunk);
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
    text-decoration-thickness: 2px;
  }

  @media (hover: hover) {
    .row:hover img {
      outline: none;
    }
  }

  .summary {
    max-width: var(--measure);
  }

  .when {
    margin: 0;
  }

  @container (min-width: 36rem) {
    .row {
      grid-template-columns: 10rem minmax(0, 1fr);
      column-gap: 1.5rem;
    }

    .row.plain {
      grid-template-columns: minmax(0, 1fr);
    }

    .when {
      grid-column: 2;
    }

    .row.plain .when {
      grid-column: 1;
    }
  }

  @container (min-width: 52rem) {
    .row {
      grid-template-columns: 13.75rem minmax(0, 1fr) 10rem;
    }

    .row.plain {
      grid-template-columns: minmax(0, 1fr) 10rem;
    }

    .when {
      grid-column: 3;
      text-align: right;
    }

    .row.plain .when {
      grid-column: 2;
    }
  }
</style>
