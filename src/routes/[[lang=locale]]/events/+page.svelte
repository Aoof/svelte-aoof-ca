<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import EventRow from '$lib/components/EventRow.svelte';

  let { data } = $props();

  const lang = $derived(data.lang);
  const ui = $derived(data.content.settings.ui);
  let query = $state('');

  const shown = $derived.by(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return data.content.events;
    return data.content.events.filter((event) =>
      `${event.name} ${event.location} ${event.time} ${event.date}`.toLowerCase().includes(needle)
    );
  });
</script>

<SEO title={ui.events.title} description={ui.seo.events} {lang} path="/events" />

<section class="wrap head">
  <h1>{ui.events.title}</h1>
  <p class="intro">{ui.events.intro}</p>
  <label class="search">
    <span class="meta">{ui.events.searchLabel}</span>
    <input type="search" bind:value={query} placeholder={ui.events.searchPlaceholder} autocomplete="off" />
  </label>
</section>

<section class="wrap">
  {#if shown.length}
    <ul class="list">
      {#each shown as event (event.name)}
        <EventRow {event} {lang} ui={ui.common} />
      {/each}
    </ul>
  {:else}
    <p role="status">{ui.events.noResults}</p>
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
    overflow-wrap: anywhere;
  }

  .intro {
    max-width: var(--measure);
    font-size: var(--t-lead);
  }

  .search {
    display: grid;
    gap: 0.35rem;
    max-width: 28rem;
  }

  input {
    min-height: 3rem;
    padding: 0 0.9rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--raise);
    color: var(--ink);
    font: inherit;
  }

  input::placeholder {
    color: var(--ink-quiet);
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid var(--line);
  }
</style>
