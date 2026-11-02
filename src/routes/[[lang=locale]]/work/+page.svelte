<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import ProjectRow from '$lib/components/ProjectRow.svelte';
  import { href } from '$lib/i18n';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived(data.content.settings.ui);
</script>

<SEO title={ui.work.title} description={ui.work.intro} {lang} path="/work" />

<section class="wrap head">
  <h1>{ui.work.title}</h1>
  <p class="intro">{ui.work.intro}</p>

  <nav class="filters" aria-label={ui.work.filterLabel}>
    <a href={href(lang, '/work')} aria-current={data.active ? undefined : 'true'}>{ui.work.all}</a>
    {#each data.content.tracks as track (track.slug)}
      <a
        href={`${href(lang, '/work')}?track=${track.slug}`}
        aria-current={data.active === track.slug ? 'true' : undefined}
      >
        {track.title}
      </a>
    {/each}
  </nav>
</section>

<section class="wrap">
  {#if data.projects.length}
    <ul class="list">
      {#each data.projects as project (project.slug)}
        <ProjectRow {project} {lang} ui={ui.common} />
      {/each}
    </ul>
  {:else}
    <p>{ui.work.empty}</p>
  {/if}
</section>

<style>
  .head {
    display: grid;
    gap: 1.25rem;
    padding-top: clamp(2rem, 5vw, 4rem);
    padding-bottom: 2rem;
  }

  h1 {
    font-size: var(--t-title);
  }

  .intro {
    max-width: var(--measure);
    font-size: var(--t-lead);
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.5rem;
  }

  .filters a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    font-stretch: 112%;
    font-weight: 600;
    color: var(--ink-quiet);
    text-decoration: none;
  }

  .filters a:hover {
    color: var(--ink);
  }

  .filters a[aria-current='true'] {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: var(--pink);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.4em;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid var(--line);
  }
</style>
