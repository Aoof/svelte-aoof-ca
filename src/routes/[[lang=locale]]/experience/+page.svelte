<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import TimelineRow from '$lib/components/TimelineRow.svelte';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived(data.content.settings.ui);
  const entries = $derived(data.content.experience);
  const sections = $derived(
    (['job', 'education', 'volunteering'] as const)
      .map((kind) => ({
        kind,
        title: ui.experience[kind === 'job' ? 'jobs' : kind],
        rows: entries.filter((entry) => entry.kind === kind)
      }))
      .filter((section) => section.rows.length)
  );
  const other = $derived(entries.filter((entry) => entry.kind === 'other'));
</script>

<SEO title={ui.experience.title} description={ui.seo.experience} {lang} path="/experience" />

<section class="wrap head">
  <h1>{ui.experience.title}</h1>
  <p class="intro">{ui.experience.intro}</p>
</section>

{#each sections as section (section.kind)}
  <section class="wrap block">
    <h2>{section.title}</h2>
    <ul class="list">
      {#each section.rows as entry (entry.title + entry.location)}
        <TimelineRow {entry} {lang} ui={ui.common} />
      {/each}
    </ul>
  </section>
{/each}

{#if other.length}
  <section class="wrap block">
    <h2>{ui.experience.other}</h2>
    <p class="note">{ui.experience.otherNote}</p>
    <ul class="plain">
      {#each other as entry (entry.title)}
        <li>
          {#if entry.link}
            <a href={entry.link} target="_blank" rel="noopener noreferrer">{entry.title}</a>
          {:else}
            {entry.title}
          {/if}
          <div class="meta">{@html entry.description}</div>
        </li>
      {/each}
    </ul>
  </section>
{/if}

<style>
  .head {
    display: grid;
    gap: 1.25rem;
    padding-top: clamp(2rem, 5vw, 4rem);
  }

  h1 {
    font-size: var(--t-title);
  }

  .intro,
  .note {
    max-width: var(--measure);
  }

  .intro {
    font-size: var(--t-lead);
  }

  .block {
    padding-top: var(--section);
  }

  .list {
    margin: 1.5rem 0 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid var(--line);
  }

  .note {
    margin-top: 0.75rem;
  }

  .plain {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }

  .plain li {
    display: grid;
    gap: 0.15rem;
    padding-block: 0.75rem;
    border-top: 3px solid #111;
  }
</style>
