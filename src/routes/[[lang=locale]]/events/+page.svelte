<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import EventRow from '$lib/components/EventRow.svelte';
  import { href } from '$lib/i18n';

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

  const origin = 'https://aoof.ca';
  const eventsUrl = $derived(origin + href(lang, '/events'));

  // Generate JSON-LD for each event
  const eventJsonLd = $derived(
    data.content.events.map((event) => {
      const eventUrl = event.link || eventsUrl;
      const eventImage = event.image ? origin + event.image : undefined;
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        description: event.summary,
        url: eventUrl,
        image: eventImage,
        startDate: event.date + '-01', // Convert YYYY-MM to YYYY-MM-DD
        location: {
          '@type': 'Place',
          name: event.location
        },
        organizer: {
          '@type': 'Person',
          name: 'Abdulrahman Mousa',
          url: 'https://aoof.ca'
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
      };
    })
  );

  // Breadcrumbs
  const breadcrumbs = $derived([
    { name: 'Home', url: href(lang, '/') },
    { name: ui.events.title, url: eventsUrl }
  ]);
</script>

<SEO
  title={ui.events.title}
  description={ui.seo.events}
  {lang}
  path="/events"
  jsonLd={eventJsonLd}
  breadcrumbs={breadcrumbs}
/>

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
      {#each shown as event, index (`${event.date}-${event.name}`)}
        <EventRow {event} {lang} ui={ui.common} {index} />
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
